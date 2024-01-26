package com.backend.pizza.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ingredient")
public class IngredientEntity {

    @Id
    @Column(name = "id_ingredient")
    private Long idIngredient;

    @Column(name = "ingredient_name", length = 50, nullable = false)
    private String ingredientName;

    @Column(name = "url_image", length = 50, nullable = false)
    private String urlImage;

    @Column(name = "author_image", length = 50, nullable = false)
    private String authorImage;

    /*private List<PizzaEntity> pizzaList;*/
}
