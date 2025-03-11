package com.backend.pizzacustomer.service;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.TokenRepository;
import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import com.backend.pizzacustomer.setup.testcontainer.RabbitTestContainer;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.OutputCaptureExtension;

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


}
