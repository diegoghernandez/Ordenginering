package com.backend.pizzacustomer.service;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.TokenRepository;
import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ComponentScan(basePackages = "com.backend.pizzacustomer.domain")
@ImportAutoConfiguration({BCryptPasswordEncoder.class, RabbitAutoConfiguration.class})
public class TokenServiceImplTest implements MysqlTestContainer {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TokenRepository tokenRepository;

    @Test
    @DisplayName("Should create a new token with the customer id, type and expiration time specified")
    void createNewToken() {
        var expirationTime = LocalDateTime.now().plusHours(2);

        var tokenId = tokenService.createNewToken(
                TestDataUtil.getCustomer().getIdCustomer(),
                TokenType.VERIFICATION,
                expirationTime);

        var token = tokenRepository.findById(tokenId);

        assertAll(
                () -> assertTrue(token.isPresent()),
                () -> assertEquals(TokenType.VERIFICATION, token.get().getTokenType()),
                () -> assertEquals(TestDataUtil.getCustomer().getIdCustomer(), token.get().getIdCustomer()),
                () -> assertEquals(expirationTime, token.get().getExpirationTime())
        );
    }
}
