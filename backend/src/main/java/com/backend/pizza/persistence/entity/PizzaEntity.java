package com.backend.pizza.persistence.entity;

import com.backend.pizza.constants.Size;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pizza")
public class PizzaEntity {

    @Id
    @Column(name = "id_pizza")
    private UUID idPizza;

    @Column(name = "id_order")
    private UUID idOrder;

    @Column(name = "pizza_name", length = 50, nullable = false, unique = true)
    private String pizzaName;

    @Column(nullable = false, columnDefinition = "Decimal(5,2)")
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @Column(name = "pizza_timestamp", columnDefinition = "TIMESTAMP")
    private LocalDateTime pizzaTimestamp;

    /*@OneToMany(mappedBy = "pizzaList")
    private List<IngredientEntity> ingredientList;*/

    @ManyToOne
    @JoinColumn(name = "id_order", referencedColumnName = "id_order", insertable = false, updatable = false)
    private OrderEntity order;
}
