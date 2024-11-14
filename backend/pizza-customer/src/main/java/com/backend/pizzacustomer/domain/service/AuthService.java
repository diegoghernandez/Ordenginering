package com.backend.pizzacustomer.domain.service;

import com.backend.pizzacustomer.constants.TokenStatus;

import java.util.UUID;

public interface AuthService {

    TokenStatus veryAccount(UUID tokenId);
}
