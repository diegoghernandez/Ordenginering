package com.backend.pizzaingredient.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("env")
public record PizzaIngredientProperties(
        String accessKeyId,
        String secretAccessKey,
        String bucket
) {}
