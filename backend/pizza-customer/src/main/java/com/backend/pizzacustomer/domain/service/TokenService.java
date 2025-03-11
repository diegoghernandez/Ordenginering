package com.backend.pizzacustomer.domain.service;

import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.persistence.entity.TokenEntity;

import java.util.Optional;
import java.util.UUID;

public interface TokenService {

    UUID createNewToken(long customerId, TokenType tokenType, int minutesToExpire);

    Optional<TokenEntity> getById(UUID tokenId);

    void deleteById(UUID tokenId);
}