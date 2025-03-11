package com.backend.pizzacustomer.domain;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.constants.TokenType;
import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
import com.backend.pizzacustomer.domain.dto.ResetPasswordExchangeDto;
import com.backend.pizzacustomer.domain.message.CustomerMessage;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import com.backend.pizzacustomer.utils.TokenUtils;
import com.backend.pizzacustomer.web.dto.VerifyTokenDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final CustomerRepository customerRepository;

    private final TokenService tokenService;

    private final CustomerMessage customerMessage;

    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            CustomerRepository customerRepository, TokenService tokenService, CustomerMessage customerMessage,
            PasswordEncoder passwordEncoder
    ) {
        this.customerRepository = customerRepository;
        this.tokenService = tokenService;
        this.customerMessage = customerMessage;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void sendResetPasswordToken(String email) {
        var customer = customerRepository.findByEmail(email);

        if (customer.isPresent()) {
            var token = tokenService.createNewToken(customer.get().getIdCustomer(), TokenType.RESET_PASSWORD, 10);

            customerMessage.sendToResetPasswordExchange(new ResetPasswordExchangeDto(
                    email,
                    token,
                    "en"
            ));
        }
    }

    @Override
    public TokenStatus verifyToken(VerifyTokenDto verifyTokenDto) {
        var token = tokenService.getById(verifyTokenDto.token());

        var tokenStatus = TokenUtils.validateToken(token);
        if (tokenStatus != TokenStatus.EXPIRED) tokenService.deleteById(verifyTokenDto.token());

        if (tokenStatus != TokenStatus.SUCCESSFUL) return tokenStatus;

        var tokenEntity = token.get();

        switch (tokenEntity.getTokenType()) {
            case VERIFICATION -> customerRepository.changeDisableStatus(false, tokenEntity.getIdCustomer());
            case RESET_PASSWORD -> customerRepository.changePassword(
                    passwordEncoder.encode(verifyTokenDto.newPassword()), tokenEntity.getIdCustomer());
        }

        return tokenStatus;
    }

    @Override
    public void resendToken(UUID tokenId) {
        var token = tokenService.getById(tokenId);

        if (token.isPresent()) {
            tokenService.deleteById(tokenId);
            var tokenEntity = token.get();
            var tokenType = tokenEntity.getTokenType();

            var customerEntity = customerRepository.findById(tokenEntity.getIdCustomer()).get();

            switch (tokenType) {
                case VERIFICATION -> {
                    customerMessage.sendToCustomerSaveExchange(new CustomerSaveDto(
                            tokenEntity.getIdCustomer(),
                            customerEntity.getEmail(),
                            tokenService.createNewToken(tokenEntity.getIdCustomer(), tokenType, 20),
                            "en"
                    ));
                }

                case RESET_PASSWORD -> customerMessage.sendToResetPasswordExchange(new ResetPasswordExchangeDto(
                        customerEntity.getEmail(),
                        tokenService.createNewToken(tokenEntity.getIdCustomer(), tokenType, 10),
                        "en"
                ));
            }
        }
    }
}
