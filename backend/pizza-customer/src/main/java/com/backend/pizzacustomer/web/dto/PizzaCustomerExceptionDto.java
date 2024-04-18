package com.backend.pizzacustomer.web.dto;

import java.util.Map;

public record PizzaCustomerExceptionDto(
        String desc,
        Map<String, String> fieldError
) {}
