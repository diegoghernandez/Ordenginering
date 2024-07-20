package com.backend.pizzaorder.web.domain;

import com.backend.pizzaorder.constants.Size;

import java.util.List;
import java.util.UUID;

public record PizzaDomain(
        UUID idPizza,
        String pizzaName,
        String pizzaImageName,
        String pizzaImageAuthor,
        Integer price,
        Size size,
        Integer quantity,
        List<IngredientDomain> pizzaIngredients
) {}
