package com.backend.pizzadata.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IngredientNameDto(
        @NotBlank String name,
        @Min(1) @Max(2) @NotNull int quantity
) {}
