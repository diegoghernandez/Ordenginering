package com.backend.pizzadata.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderDto(
        @Min(1) @NotNull long idCustomer,
        @NotBlank String country,
        @NotBlank String state,
        @NotBlank String city,
        @NotBlank String street,
        @Min(1) @NotNull int houseNumber,
        @Min(1) Integer apartment,
        @Min(1) Integer floor,
        @NotEmpty List<PizzaDto> pizzaList
) {}
