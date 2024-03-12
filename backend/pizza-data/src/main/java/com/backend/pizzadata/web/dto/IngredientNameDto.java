package com.backend.pizzadata.web.dto;

import com.backend.pizzadata.constants.Quantity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IngredientNameDto(
        @NotBlank String name,
        @NotNull Quantity quantity
) {}
