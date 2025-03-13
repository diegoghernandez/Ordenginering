package com.backend.pizzacustomer.service;


import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.TokenRepository;
import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import com.backend.pizzacustomer.web.config.RabbitMQConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ComponentScan(basePackages = "com.backend.pizzacustomer.domain")
@Import({BCryptPasswordEncoder.class, RabbitMQConfig.class})
@ImportAutoConfiguration({RabbitAutoConfiguration.class})
class TokenServiceImplTest implements MysqlTestContainer {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private TestEntityManager testEntityManager;

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
    @DisplayName("Should get the respective token with its id")
    void getById() {
        var token = tokenService.createNewToken(TestDataUtil.getCustomer().getIdCustomer(), TokenType.VERIFICATION, 10);
        var tokenEntity = tokenService.getById(token);

        assertAll(
                () -> assertTrue(tokenService.getById(UUID.randomUUID()).isEmpty()),
                () -> assertTrue(tokenEntity.isPresent())
        );
    }

    @Test
    @DisplayName("Should get the respective token with its id")
    void deleteById() {
        var token = tokenService.createNewToken(TestDataUtil.getCustomer().getIdCustomer(), TokenType.VERIFICATION, 10);
        var tokenEntity = tokenService.getById(token);

        testEntityManager.flush();
        testEntityManager.clear();

        tokenService.deleteById(token);
        var emptyTokenEntity = tokenService.getById(token);

        assertAll(
                () -> assertTrue(tokenEntity.isPresent()),
                () -> assertFalse(emptyTokenEntity.isPresent())
        );
    }
}
