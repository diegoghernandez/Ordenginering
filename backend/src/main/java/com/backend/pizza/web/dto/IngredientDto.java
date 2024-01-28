package com.backend.pizza.web.dto;

public record IngredientDto(
        String ingredientName,
        String urlImage,
        String authorImage
) {}
