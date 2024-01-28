package com.backend.pizza.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer")
public class CustomerEntity {

    @Id
    @Column(name = "id_customer")
    private Long idCustomer;

    @Column(name = "customer_name", length = 50, nullable = false)
    private String customerName;

    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @Column(length = 60, nullable = false)
    private String password;

    @Column(name = "birth_date",nullable = false, columnDefinition = "DATE")
    private LocalDate birthDate;

    @Column(name = "creation_timestamp", columnDefinition = "TIMESTAMP")
    private LocalDateTime creationTimestamp;
}
