package com.backend.pizzaingredient.env;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("bucket")
public record BucketProperties(
        String accessKeyId,
        String secretAccessKey,
        String name
) {}
