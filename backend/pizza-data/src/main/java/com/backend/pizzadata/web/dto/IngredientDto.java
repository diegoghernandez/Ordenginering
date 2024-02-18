package com.backend.pizzadata.web.dto;

import jakarta.validation.constraints.NotBlank;

public record IngredientDto(
        @NotBlank String ingredientName,
        @NotBlank String urlImage,
        @NotBlank String authorImage
) {}
