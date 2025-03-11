package com.backend.pizzacustomer.web.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record VerifyTokenDto(
        @NotNull UUID token,
        String newPassword,
        String repeatNewPassword,
        String newEmail
) {
}
