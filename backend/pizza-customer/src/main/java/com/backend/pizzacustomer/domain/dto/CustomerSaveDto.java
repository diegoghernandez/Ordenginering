package com.backend.pizzacustomer.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomerSaveDto {
    private long customerId;
    private String email;
    private String token;
    private String locale;
}
