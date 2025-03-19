package com.backend.pizzacustomer.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ResendDto(
        @NotNull UUID token,
        @NotBlank String locale
) {
}
