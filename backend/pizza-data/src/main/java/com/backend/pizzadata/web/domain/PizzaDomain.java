package com.backend.pizzadata.web.domain;

import com.backend.pizzadata.constants.Size;

import java.util.List;
import java.util.UUID;

public record PizzaDomain(
        UUID idPizza,
        String pizzaName,
        String pizzaImageUrl,
        String pizzaImageAuthor,
        Integer price,
        Size size,
        Integer quantity,
        List<IngredientDomain> pizzaIngredients
) {}
