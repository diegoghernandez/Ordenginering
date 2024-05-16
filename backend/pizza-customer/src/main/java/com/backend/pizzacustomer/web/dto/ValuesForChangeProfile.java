package com.backend.pizzacustomer.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;

public record ValuesForChangeProfile(
        @NotBlank String name,
        @Past LocalDate birthDate,
        @Valid  NecessaryValuesForChangeDto valuesForChangeDto
) {}
