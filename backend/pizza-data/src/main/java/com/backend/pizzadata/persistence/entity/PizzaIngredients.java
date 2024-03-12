package com.backend.pizzadata.persistence.entity;

import com.backend.pizzadata.constants.Quantity;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pizza_ingredients")
public class PizzaIngredients {

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "id_pizza_ingredients")
   @ToString.Exclude
   private UUID idPizzaIngredients;

   @ManyToOne
   @JoinColumn(name = "id_pizza")
   private PizzaEntity pizzaEntity;

   @ManyToOne
   @JoinColumn(name = "id_ingredient")
   private IngredientEntity ingredientEntity;

   @Enumerated(EnumType.STRING)
   @Column(name = "ingredient_quantity", nullable = false)
   private Quantity ingredienQuantity;
}
