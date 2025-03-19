package com.backend.pizzacustomer.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmailDto(@Email @NotBlank String email, @NotBlank String locale) {
}
