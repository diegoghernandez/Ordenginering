package com.backend.pizzacustomer.service;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.TokenRepository;
import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import com.backend.pizzacustomer.setup.testcontainer.RabbitTestContainer;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.testcontainers.shaded.org.awaitility.Awaitility;

import java.time.Duration;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
@AutoConfigureDataJpa
@ExtendWith(OutputCaptureExtension.class)
public class TokenServiceImplTest implements MysqlTestContainer, RabbitTestContainer {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TokenRepository tokenRepository;

    @RabbitListener(queues = "q.pizza_customer.save_customer_role")
    public void onPaymentEvent(CustomerSaveDto customerSaveDto) {
        log.info("Customer id: {}", customerSaveDto.getCustomerId());
        log.info("Customer email: {}", customerSaveDto.getEmail());
        log.info("Token: {}", customerSaveDto.getToken());
        log.info("Locale: {}", customerSaveDto.getLocale());
    }

    @Test
    @DisplayName("Should create a new token with the customer id, type and expiration time specified")
    void createNewToken() {
        var tokenId = tokenService.createNewToken(
                TestDataUtil.getCustomer().getIdCustomer(),
                TokenType.VERIFICATION,
                10);

        var token = tokenRepository.findById(tokenId);

        assertAll(
                () -> assertTrue(token.isPresent()),
                () -> assertEquals(TokenType.VERIFICATION, token.get().getTokenType()),
                () -> assertEquals(TestDataUtil.getCustomer().getIdCustomer(), token.get().getIdCustomer()),
                () -> assertTrue(LocalDateTime.now().isBefore(token.get().getExpirationTime()))
        );
    }

    @Test
    @DisplayName("Should resend the token to the respective customer")
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
                () -> assertTrue(tokenRepository.findById(tokenId).isEmpty())
        );
    }
}
