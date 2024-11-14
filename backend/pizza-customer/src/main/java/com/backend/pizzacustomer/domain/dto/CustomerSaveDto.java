package com.backend.pizzacustomer.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class CustomerSaveDto {
    private long customerId;
    private String email;
    private UUID token;
    private String locale;
}
