package com.backend.pizza.web.dto;

import jakarta.validation.constraints.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public record OrderDto(
        @Min(1) @NotNull long idCustomer,
        @NotBlank String country,
        @NotBlank String city,
        @NotBlank String street,
        @Min(1) @NotNull int houseNumber,
        @Null Integer apartment,
        @Null Integer floor,
        @NotEmpty List<PizzaDto> pizzaDtoList
) {}
