package com.backend.pizzadata.persistence.entity;

import com.backend.pizzadata.constants.Size;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pizza")
public class PizzaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_pizza")
    @ToString.Exclude
    private UUID idPizza;

    @Column(name = "id_order", nullable = false)
    @ToString.Exclude
    private UUID idOrder;

    @Column(name = "pizza_name", length = 50, nullable = false)
    private String pizzaName;

    @NotNull
    private Integer price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @NotNull
    private Integer quantity;

    @ToString.Exclude
    @JsonIgnore
    @Column(name = "pizza_timestamp", columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime pizzaTimestamp;

    @OneToMany(mappedBy = "pizzaEntity", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<PizzaIngredients> pizzaIngredients;

    @ManyToOne
    @JoinColumn(name = "id_order", referencedColumnName = "id_order", insertable = false, updatable = false)
    @ToString.Exclude
    @JsonIgnore
    private OrderEntity order;
}
