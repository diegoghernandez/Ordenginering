package com.backend.pizzacustomer.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NecessaryValuesForChangeDto(
        @NotNull long id,
        @NotBlank String password
) {
}
