package com.backend.pizzaingredient.persistence.entity;

import com.backend.pizzaingredient.constants.IngredientType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

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

   @Type(JsonType.class)
   @Column(name = "ingredient_name", columnDefinition = "json", nullable = false)
   private IngredientName ingredientName;

   @Enumerated(EnumType.STRING)
   @Column(name = "ingredient_type", nullable = false)
   private IngredientType ingredientType;

   @Column(name = "author_image", length = 50, nullable = false)
   private String authorImage;

   @Column(name = "file_name_image", length = 50, nullable = false)
   private String fileNameImage;
}
