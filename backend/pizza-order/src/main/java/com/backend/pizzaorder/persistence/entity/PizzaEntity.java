package com.backend.pizzaorder.persistence.entity;

import com.backend.pizzaorder.constants.Size;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Type;

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

    @Type(JsonType.class)
    @Column(name = "pizza_name", columnDefinition = "json", nullable = false)
    private Languages pizzaName;

    @Column(name = "pizza_image_name", nullable = false)
    private String pizzaImageName;

    @Type(JsonType.class)
    @Column(name = "pizza_image_author", columnDefinition = "json", nullable = false)
    private Languages pizzaImageAuthor;

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