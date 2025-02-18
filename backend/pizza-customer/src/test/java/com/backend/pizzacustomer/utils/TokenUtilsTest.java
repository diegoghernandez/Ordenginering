package com.backend.pizzacustomer.utils;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@ComponentScan(basePackages = "com.backend.pizzacustomer.domain")
@ImportAutoConfiguration({BCryptPasswordEncoder.class, RabbitAutoConfiguration.class})
class TokenUtilsTest implements MysqlTestContainer {

    @Autowired
    private TokenService tokenService;

    @Test
    @DisplayName("Should validate token and return the TokenStatus expected")
    void validateToken() {
        var noneStatus = TokenUtils.validateToken(tokenService.getById(UUID.randomUUID()));

        var tokenExpired = tokenService.getById(
                tokenService.createNewToken(32, TokenType.VERIFICATION, 0));
        var expiredStatus = TokenUtils.validateToken(tokenExpired);

        var tokenSuccessful = tokenService.getById(
                tokenService.createNewToken(32, TokenType.RESET_EMAIL, 10));
        var successfulStatus = TokenUtils.validateToken(tokenSuccessful);

        assertAll(
                () -> assertEquals(TokenStatus.NONE, noneStatus),
                () -> assertEquals(TokenStatus.EXPIRED, expiredStatus),
                () -> assertEquals(TokenStatus.SUCCESSFUL, successfulStatus)
        );
    }

}
