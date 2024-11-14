package com.backend.pizzacustomer.service;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ComponentScan(basePackages = "com.backend.pizzacustomer.domain")
@ImportAutoConfiguration({BCryptPasswordEncoder.class, RabbitAutoConfiguration.class})
class AuthServiceImplTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    @DisplayName("Should verify the token and according to the answer, enable the desire customer")
    void veryAccount() {
        var customerId = 2L;
        var tokenStatus = authService.veryAccount(UUID.randomUUID());

        var customerDisabled = customerRepository.findById(customerId).get();

        testEntityManager.flush();
        testEntityManager.clear();

        var verifiedStatus = authService.veryAccount(
                tokenService.createNewToken(customerId, TokenType.VERIFICATION, LocalDateTime.now().plusHours(2))
        );

        assertAll(
                () -> assertTrue(customerDisabled.getDisable()),
                () -> assertEquals(TokenStatus.NONE, tokenStatus),
                () -> assertFalse(customerRepository.findById(customerId).get().getDisable()),
                () -> assertEquals(TokenStatus.SUCCESSFUL, verifiedStatus)
        );
    }
}