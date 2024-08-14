package com.backend.pizzaingredient.web.dto;

import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.persistence.entity.IngredientName;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record IngredientDto(
        @Valid IngredientName ingredientName,
        @NotNull IngredientType ingredientType,
        @Nullable String authorImage
) {
}
