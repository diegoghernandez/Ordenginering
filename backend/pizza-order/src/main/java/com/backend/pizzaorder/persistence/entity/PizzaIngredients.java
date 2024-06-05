package com.backend.pizzaorder.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

   @Column(name = "id_pizza", nullable = false)
   private UUID idPizza;

   @Column(name = "id_ingredient", nullable = false)
   private Integer idIngredient;

   @Min(1)
   @Max(2)
   @Column(name = "ingredient_quantity", nullable = false)
   private Integer ingredientQuantity;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "id_pizza", referencedColumnName = "id_pizza", insertable = false, updatable = false)
   private PizzaEntity pizzaEntity;
}
