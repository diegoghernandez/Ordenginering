package com.backend.pizzadata.web.dto;

import jakarta.validation.constraints.*;

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
