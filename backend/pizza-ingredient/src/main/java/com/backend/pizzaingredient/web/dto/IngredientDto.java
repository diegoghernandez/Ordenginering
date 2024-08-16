package com.backend.pizzaingredient.web.dto;

import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.persistence.entity.Languages;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record IngredientDto(
        @Valid Languages ingredientName,
        @NotNull IngredientType ingredientType,
        @Nullable Languages authorImage
) {
}
