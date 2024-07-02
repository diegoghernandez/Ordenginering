package com.backend.pizzaingredient.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("bucket")
public record PizzaIngredientProperties(
        String accessKeyId,
        String secretAccessKey,
        String bucket
) {}
