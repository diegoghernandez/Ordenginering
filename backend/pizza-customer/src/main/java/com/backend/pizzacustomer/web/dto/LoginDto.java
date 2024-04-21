package com.backend.pizzacustomer.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginDto(
        @Email String email,
        @NotBlank String password
) {}
