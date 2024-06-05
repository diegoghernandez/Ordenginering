package com.backend.pizzaorder.persistence.entity;

import com.backend.pizzaorder.constants.IngredientType;
import jakarta.persistence.*;
import lombok.*;

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
}
