package com.backend.pizzaorder.persistence.entity;

import com.backend.pizzaorder.constants.Size;
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
    @Column(name = "id_pizza")
    @ToString.Exclude
    private UUID idPizza;

    @Column(name = "id_order", nullable = false)
    @ToString.Exclude
    private UUID idOrder;

    @Column(name = "pizza_name", length = 50, nullable = false)
    private String pizzaName;

    @Column(name = "pizza_image_url", nullable = false)
    private String pizzaImageUrl;

    @Column(name = "pizza_image_author", nullable = false)
    private String pizzaImageAuthor;

    @NotNull
    private Integer price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @NotNull
    private Integer quantity;

    @ToString.Exclude
    @Column(name = "pizza_timestamp", columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime pizzaTimestamp;

    @OneToMany(mappedBy = "pizzaEntity", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<PizzaIngredients> pizzaIngredients;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_order", referencedColumnName = "id_order", insertable = false, updatable = false)
    @ToString.Exclude
    private OrderEntity order;
}