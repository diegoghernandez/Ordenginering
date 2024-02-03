package com.backend.pizza.web.dto;

import com.backend.pizza.constants.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record PizzaDto(
        @NotNull UUID idPizza,
        @NotBlank String pizzaName,
        @NotNull Size size,
        @Min(1) @NotNull int quantity,
        @NotEmpty List<Integer> ingredientIdList
) {}
