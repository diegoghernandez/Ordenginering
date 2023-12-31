package com.backend.pizza.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER)
    private List<PizzaEntity> pizzaList;
}
