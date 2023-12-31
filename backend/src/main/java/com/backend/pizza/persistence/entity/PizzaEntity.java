package com.backend.pizza.persistence.entity;

import com.backend.pizza.constants.Size;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pizza")
public class PizzaEntity {

    @Id
    @Column(name = "id_pizza")
    private Long idPizza;

    @Column(name = "id_customer")
    private Long idCustomer;

    @Column(name = "pizza_name", length = 50, nullable = false)
    private String pizzaName;

    @Column(nullable = false, columnDefinition = "Decimal(5,2)")
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @Builder.Default
    @Column(name = "pizza_timestamp", nullable = false)
    private LocalDateTime pizzaTimestamp = LocalDateTime.now();

    /*@OneToMany(mappedBy = "pizzaList")
    private List<IngredientEntity> ingredientList;*/

    @ManyToOne
    @JoinColumn(name = "id_customer", referencedColumnName = "id_customer", insertable = false, updatable = false)
    private CustomerEntity customer;
}
