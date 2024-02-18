package com.backend.pizzadata.web.dto;

import jakarta.validation.constraints.*;

import java.util.List;

public record OrderDto(
        @Min(1) @NotNull long idCustomer,
        @NotBlank String country,
        @NotBlank String city,
        @NotBlank String street,
        @Min(1) @NotNull int houseNumber,
        @Null Integer apartment,
        @Null Integer floor,
        @NotEmpty List<PizzaDto> pizzaList
) {}
