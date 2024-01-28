package com.backend.pizza.web.dto;

import com.backend.pizza.constants.Size;

import java.util.UUID;

public record PizzaDto(
        UUID idPizza,
        String pizzaName,
        Size size

) {}
