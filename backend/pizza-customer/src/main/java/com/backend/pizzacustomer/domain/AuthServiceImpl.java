package com.backend.pizzacustomer.domain;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import com.backend.pizzacustomer.utils.TokenUtils;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final TokenService tokenService;

    private final CustomerRepository customerRepository;

    public AuthServiceImpl(TokenService tokenService, CustomerRepository customerRepository) {
        this.tokenService = tokenService;
        this.customerRepository = customerRepository;
    }

    @Override
    public TokenStatus veryAccount(UUID tokenId) {
        var token = tokenService.getById(tokenId);

        var tokenStatus = TokenUtils.validateToken(token);
        if (tokenStatus != TokenStatus.EXPIRED) tokenService.deleteById(tokenId);

        if (tokenStatus != TokenStatus.SUCCESSFUL) return tokenStatus;

        var tokenEntity = token.get();

        if (tokenEntity.getTokenType() == TokenType.VERIFICATION) {
            customerRepository.changeDisableStatus(false, tokenEntity.getIdCustomer());
        }

        return tokenStatus;
    }

    @Override
    public void resendVerificationToken(UUID tokenId) {
        tokenService.resendToken(tokenId, TokenType.VERIFICATION, 10);
    }
}
