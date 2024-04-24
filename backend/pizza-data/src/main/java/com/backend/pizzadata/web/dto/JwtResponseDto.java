package com.backend.pizzadata.web.dto;

import java.util.List;

public record JwtResponseDto(
        String subject,
        List<String> roles
) {}
