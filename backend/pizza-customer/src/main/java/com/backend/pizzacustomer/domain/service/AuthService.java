package com.backend.pizzacustomer.domain.service;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.web.dto.VerifyTokenDto;

import java.util.UUID;

public interface AuthService {

    TokenStatus verifyToken(VerifyTokenDto verifyTokenDto);

    void sendResetPasswordToken(String email);

    void resendToken(UUID tokenId);
}
