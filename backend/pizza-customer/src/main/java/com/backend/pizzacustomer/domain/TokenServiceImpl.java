package com.backend.pizzacustomer.domain;

import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.entity.TokenEntity;
import com.backend.pizzacustomer.persistence.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    public TokenServiceImpl(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public UUID createNewToken(long customerId, TokenType tokenType, int minutesToExpire) {
        var savedToken = tokenRepository.save(
                TokenEntity.builder()
                           .idCustomer(customerId)
                           .tokenType(tokenType)
                           .expirationTime(
                                   LocalDateTime.now().plusMinutes(minutesToExpire))
                           .build());

        return savedToken.getIdToken();
    }

    @Override
    public Optional<TokenEntity> getById(UUID tokenId) {
        return tokenRepository.findById(tokenId);
    }

    @Override
    public void deleteById(UUID tokenId) {
        tokenRepository.deleteById(tokenId);
    }
}
