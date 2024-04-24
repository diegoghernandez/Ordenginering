package com.backend.pizzacustomer.web.dto;

import java.util.List;

public record JwtResponseDto(
        String subject,
        List<String> roles
) {}
