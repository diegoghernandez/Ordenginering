package com.backend.pizzaorder.web.domain;

import com.backend.pizzaorder.constants.Size;
import com.backend.pizzaorder.persistence.entity.Languages;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

public record PizzaDomain(
        UUID idPizza,
        @Valid Languages pizzaName,
        String pizzaImageName,
        @Valid Languages pizzaImageAuthor,
        Integer price,
        Size size,
        Integer quantity,
        List<IngredientDomain> pizzaIngredients
) {}
