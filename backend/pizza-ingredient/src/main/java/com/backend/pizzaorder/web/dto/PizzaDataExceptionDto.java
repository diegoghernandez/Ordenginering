package com.backend.pizzaorder.web.dto;

import java.util.Map;

public record PizzaDataExceptionDto(
        String desc,
        Map<String, String> fieldError
) {
}
