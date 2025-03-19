package com.backend.pizzacustomer.service;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
import com.backend.pizzacustomer.domain.dto.ResetPasswordExchangeDto;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import com.backend.pizzacustomer.setup.testcontainer.RabbitTestContainer;
import com.backend.pizzacustomer.web.config.RabbitMQConfig;
import com.backend.pizzacustomer.web.dto.EmailDto;
import com.backend.pizzacustomer.web.dto.VerifyTokenDto;
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
@Import({RabbitMQConfig.class, BCryptPasswordEncoder.class})
@ImportAutoConfiguration({RabbitAutoConfiguration.class})
@ExtendWith(OutputCaptureExtension.class)
class AuthServiceImplTest implements MysqlTestContainer, RabbitTestContainer {

    @Autowired
    private AuthService authService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TestEntityManager testEntityManager;

    @RabbitListener(queues = "q.pizza_customer.save_customer_role")
    public void onPaymentEvent(CustomerSaveDto customerSaveDto) {
        log.info("Customer id: {}", customerSaveDto.getCustomerId());
        log.info("Customer email: {}", customerSaveDto.getEmail());
        log.info("Token: {}", customerSaveDto.getToken());
        log.info("Locale: {}", customerSaveDto.getLocale());
    }

    @RabbitListener(queues = "q.pizza_customer.reset_password_email")
    public void onResetPassword(ResetPasswordExchangeDto resetPasswordExchangeDto) {
        log.info("Reset password email: {}", resetPasswordExchangeDto.email());
        log.info("Reset password token: {}", resetPasswordExchangeDto.token());
        log.info("Reset password locale: {}", resetPasswordExchangeDto.locale());
    }

    @Test
    @DisplayName("Should send a token to reset the password to the respective email")
    void sendResetPasswordToken(CapturedOutput capturedOutput) {
        var customerEmail = TestDataUtil.getCustomer().getEmail();
        authService.sendResetPasswordToken(new EmailDto(customerEmail, "en"));

        Awaitility.await()
                  .atMost(Duration.ofSeconds(5L))
                  .until(() -> capturedOutput.getOut().contains("Reset password email: " + customerEmail));

        assertAll(
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Reset password email: " + customerEmail),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Reset password token: "),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Reset password locale: en"));
    }

    @Test
    @DisplayName("Should verify the VERIFICATION token, and activate the customer")
    void verifyToken__VERIFICATION() {
        var customerId = 2L;
        var tokenStatus = authService.verifyToken(VerifyTokenDto.builder().token(UUID.randomUUID()).build());

        var customerDisabled = customerRepository.findById(customerId).get();

        testEntityManager.flush();
        testEntityManager.clear();

        var expiredToken = tokenService.createNewToken(customerId, TokenType.VERIFICATION, 0);
        var expiredStatus = authService.verifyToken(VerifyTokenDto.builder().token(expiredToken).build());

        var successfulToken = tokenService.createNewToken(customerId, TokenType.VERIFICATION, 10);
        var verifiedStatus = authService.verifyToken(VerifyTokenDto.builder().token(successfulToken).build());

        assertAll(
                () -> assertTrue(customerDisabled.getDisable()), () -> assertEquals(TokenStatus.NONE, tokenStatus),

                () -> assertTrue(tokenService.getById(expiredToken).isPresent()),
                () -> assertEquals(TokenStatus.EXPIRED, expiredStatus),

                () -> assertFalse(customerRepository.findById(customerId).get().getDisable()),
                () -> assertEquals(TokenStatus.SUCCESSFUL, verifiedStatus),
                () -> assertFalse(tokenService.getById(successfulToken).isPresent()));
    }

    @Test
    @DisplayName("Should verify the RESET_PASSWORD token, and change the customer password to a new one")
    void verifyToken__RESET_PASSWORD() {
        var customerId = 31L;
        var noneTokenStatus = authService.verifyToken(VerifyTokenDto.builder().token(UUID.randomUUID()).build());

        var customerOldPassword = customerRepository.findById(customerId).get();

        testEntityManager.flush();
        testEntityManager.clear();

        var expiredToken = tokenService.createNewToken(customerId, TokenType.RESET_PASSWORD, 0);
        var expiredStatus = authService.verifyToken(
                VerifyTokenDto.builder().token(expiredToken).newPassword("hola").build());

        var customerWithoutChange = customerRepository.findById(customerId).get();

        testEntityManager.flush();
        testEntityManager.clear();

        var successfulToken = tokenService.createNewToken(customerId, TokenType.RESET_PASSWORD, 10);
        var verifiedStatus = authService.verifyToken(
                VerifyTokenDto.builder().token(successfulToken).newPassword("hola").build());

        var customerWithChange = customerRepository.findById(customerId).get();

        assertAll(
                () -> assertEquals(TokenStatus.NONE, noneTokenStatus),

                () -> assertEquals(customerOldPassword.getPassword(), customerWithoutChange.getPassword()),
                () -> assertTrue(tokenService.getById(expiredToken).isPresent()),
                () -> assertEquals(TokenStatus.EXPIRED, expiredStatus),

                () -> assertNotEquals(customerOldPassword.getPassword(), customerWithChange.getPassword()),
                () -> assertEquals(TokenStatus.SUCCESSFUL, verifiedStatus),
                () -> assertFalse(tokenService.getById(successfulToken).isPresent())
        );
    }

    @Test
    @DisplayName("Should resend the VERIFICATION token to the respective customer email")
    void resendToken__VERIFICATION(CapturedOutput capturedOutput) {
        var tokenId = tokenService.createNewToken(
                TestDataUtil.getCustomer().getIdCustomer(), TokenType.VERIFICATION,
                10);

        assertFalse(tokenService.getById(tokenId).isEmpty());

        authService.resendToken(tokenId, "en");

        Awaitility.await()
                  .atMost(Duration.ofSeconds(5L))
                  .until(() -> capturedOutput.getOut().contains("Customer id: 4234"));

        assertAll(
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Customer id: 4234"),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Customer email: random@names.com"),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Token: "),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Locale: en"),
                () -> assertTrue(tokenService.getById(tokenId).isEmpty()));
    }

    @Test
    @DisplayName("Should resend the RESET_PASSWORD token to the respective customer email")
    void resendToken__RESET_PASSWORD(CapturedOutput capturedOutput) {
        var tokenId = tokenService.createNewToken(
                TestDataUtil.getCustomer().getIdCustomer(), TokenType.RESET_PASSWORD,
                10);

        assertFalse(tokenService.getById(tokenId).isEmpty());

        authService.resendToken(tokenId, "en");

        Awaitility.await()
                  .atMost(Duration.ofSeconds(5L))
                  .until(() -> capturedOutput.getOut()
                                             .contains(
                                                     "Reset password email: " + TestDataUtil.getCustomer().getEmail()));

        assertAll(
                () -> Assertions.assertThat(capturedOutput.getOut())
                                .contains("Reset password email: " + TestDataUtil.getCustomer().getEmail()),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Reset password token: "),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Reset password locale: en"),
                () -> assertTrue(tokenService.getById(tokenId).isEmpty()));
    }
}