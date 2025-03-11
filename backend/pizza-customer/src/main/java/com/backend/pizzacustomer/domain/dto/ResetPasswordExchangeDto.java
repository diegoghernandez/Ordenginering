package com.backend.pizzacustomer.domain.dto;

import java.util.UUID;

public record ResetPasswordExchangeDto(
        String email,
        UUID token,
        String locale
) {
}
