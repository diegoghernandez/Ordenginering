package com.backend.pizzaingredient.web.dto;

import java.util.Map;

public record PizzaDataExceptionDto(
        String desc,
        Map<String, String> fieldError
) {
}
