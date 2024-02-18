package com.backend.pizzadata.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CustomerDto(
        @NotBlank @Size(max=64) String customerName,
        @Email @Size(max=64) String email,
        @NotBlank String password,
        @NotBlank String matchingPassword,
        @Past LocalDate birthDate
) {}
