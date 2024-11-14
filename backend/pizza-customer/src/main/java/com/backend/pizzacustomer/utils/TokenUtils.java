package com.backend.pizzacustomer.utils;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.persistence.entity.TokenEntity;

import java.time.LocalDateTime;
import java.util.Optional;

public class TokenUtils {

    public static TokenStatus validateToken(Optional<TokenEntity> tokenEntity) {
        if (tokenEntity.isEmpty()) return TokenStatus.NONE;

        if (tokenEntity.get().getExpirationTime().isBefore(LocalDateTime.now()))
            return TokenStatus.EXPIRED;

        return TokenStatus.SUCCESSFUL;
    }
}
