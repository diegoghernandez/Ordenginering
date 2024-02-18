package com.backend.pizzadata.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ToString.Exclude
    @Column(name = "creation_timestamp", columnDefinition = "DATETIME")
    private LocalDateTime creationTimestamp;
}
