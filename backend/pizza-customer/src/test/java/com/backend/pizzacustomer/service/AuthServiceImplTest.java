package com.backend.pizzacustomer.service;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import com.backend.pizzacustomer.setup.testcontainer.RabbitTestContainer;
import com.backend.pizzacustomer.web.config.RabbitMQConfig;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.testcontainers.shaded.org.awaitility.Awaitility;

import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@DataJpaTest
@ComponentScan(basePackages = "com.backend.pizzacustomer.domain")
@Import({BCryptPasswordEncoder.class, RabbitMQConfig.class})
@ImportAutoConfiguration({RabbitAutoConfiguration.class})
@ExtendWith(OutputCaptureExtension.class)
class AuthServiceImplTest implements RabbitTestContainer {

    @Autowired
    private AuthService authService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @RabbitListener(queues = "q.pizza_customer.save_customer_role")
    public void onPaymentEvent(CustomerSaveDto customerSaveDto) {
        log.info("Customer id: {}", customerSaveDto.getCustomerId());
        log.info("Customer email: {}", customerSaveDto.getEmail());
        log.info("Token: {}", customerSaveDto.getToken());
        log.info("Locale: {}", customerSaveDto.getLocale());
    }

    @Test
    @DisplayName("Should verify the token, and according to the type, enable the desire customer")
    void veryAccount() {
        var customerId = 2L;
        var tokenStatus = authService.veryAccount(UUID.randomUUID());

        var customerDisabled = customerRepository.findById(customerId).get();

        testEntityManager.flush();
        testEntityManager.clear();

        var expiredToken = tokenService.createNewToken(customerId, TokenType.VERIFICATION, 0);
        var expiredStatus = authService.veryAccount(expiredToken);

        var successfulToken = tokenService.createNewToken(customerId, TokenType.VERIFICATION, 10);
        var verifiedStatus = authService.veryAccount(successfulToken);

        assertAll(
                () -> assertTrue(customerDisabled.getDisable()),
                () -> assertEquals(TokenStatus.NONE, tokenStatus),

                () -> assertTrue(tokenService.getById(expiredToken).isPresent()),
                () -> assertEquals(TokenStatus.EXPIRED, expiredStatus),

                () -> assertFalse(customerRepository.findById(customerId).get().getDisable()),
                () -> assertEquals(TokenStatus.SUCCESSFUL, verifiedStatus),
                () -> assertFalse(tokenService.getById(successfulToken).isPresent())
        );
    }

    @Test
    @DisplayName("Should create a new token with the customer id, type and expiration time specified")
    void resendToken(CapturedOutput capturedOutput) {
        var tokenId = tokenService.createNewToken(
                TestDataUtil.getCustomer().getIdCustomer(),
                TokenType.VERIFICATION,
                10);

        tokenService.resendToken(tokenId, TokenType.VERIFICATION, 10);

        Awaitility.await().atMost(Duration.ofSeconds(5L))
                  .until(() -> capturedOutput.getOut().contains("Customer id: 4234"));

        assertAll(
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Customer id: 4234"),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Customer email: random@names.com"),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Token: "),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Locale: en"),
                () -> assertFalse(tokenService.getById(tokenId).isPresent())
        );
    }
}