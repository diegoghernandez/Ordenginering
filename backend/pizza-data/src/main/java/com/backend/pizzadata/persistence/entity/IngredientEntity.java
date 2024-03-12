package com.backend.pizzadata.persistence.entity;

import com.backend.pizzadata.constants.IngredientType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ingredient")
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingredient")
    private Integer idIngredient;

    @Column(name = "ingredient_name", length = 50, nullable = false, unique = true)
    private String ingredientName;

    @Enumerated(EnumType.STRING)
    @Column(name = "ingredient_type", nullable = false)
    private IngredientType ingredientType;

    @Column(name = "author_image", length = 50, nullable = false)
    private String authorImage;

    @Column(name = "url_image", length = 100, nullable = false)
    private String urlImage;

    @OneToMany(mappedBy = "ingredientEntity")
    @ToString.Exclude
    @JsonIgnore
    private Set<PizzaIngredients> pizzaIngredients;
}
