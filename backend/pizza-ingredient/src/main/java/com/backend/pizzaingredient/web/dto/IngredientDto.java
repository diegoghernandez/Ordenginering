package com.backend.pizzaingredient.web.dto;

import com.backend.pizzaingredient.constants.IngredientType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IngredientDto(
        @NotBlank String ingredientName,
        @NotNull IngredientType ingredientType,
        @NotBlank String urlImage,
        @NotBlank String authorImage
) {
}
