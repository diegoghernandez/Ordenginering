package com.backend.pizzadata.web.domain;

import com.backend.pizzadata.persistence.entity.PizzaEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderDomain(
        UUID orderId,
        String country,
        String state,
        String city,
        String street,
        int houseNumber,
        Integer apartment,
        Integer floor,
        int total,
        LocalDateTime orderTimestamp,
        List<PizzaEntity> pizzaList
){}