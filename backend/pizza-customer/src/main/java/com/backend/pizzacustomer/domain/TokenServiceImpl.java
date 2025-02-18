package com.backend.pizzacustomer.domain;

import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
import com.backend.pizzacustomer.domain.message.CustomerMessage;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.entity.TokenEntity;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import com.backend.pizzacustomer.persistence.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    private final CustomerRepository customerRepository;

    private final CustomerMessage customerMessage;

    public TokenServiceImpl(
            TokenRepository tokenRepository, CustomerRepository customerRepository,
            CustomerMessage customerMessage
    ) {
        this.tokenRepository = tokenRepository;
        this.customerRepository = customerRepository;
        this.customerMessage = customerMessage;
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
    public void resendToken(UUID tokenId, TokenType tokenType, int minutesToExpire) {
        var token = tokenRepository.findById(tokenId);

        if (token.isPresent()) {
            tokenRepository.deleteById(tokenId);
            var tokenEntity = token.get();

            var newToken = createNewToken(tokenEntity.getIdCustomer(), tokenType, minutesToExpire);
            var customerEntity = customerRepository.findById(tokenEntity.getIdCustomer()).get();

            customerMessage.sendToCustomerSaveExchange(new CustomerSaveDto(
                    tokenEntity.getIdCustomer(),
                    customerEntity.getEmail(),
                    newToken,
                    "en"
            ));
        }
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
