package com.backend.pizzaingredient;

import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;

import java.util.List;

public final class TestIngredientUtil {

   public static List<IngredientEntity> getIngredientList() {
      return List.of(
              IngredientEntity.builder()
                      .idIngredient(1)
                      .ingredientName("Pepperoni")
                      .ingredientType(IngredientType.MEAT)
                      .authorImage("Author")
                      .urlImage("/meat/peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(2)
                      .ingredientName("Mozzarella")
                      .ingredientType(IngredientType.CHEESE)
                      .authorImage("Author")
                      .urlImage("/cheese/mozzarella")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(3)
                      .ingredientName("Pineapple")
                      .ingredientType(IngredientType.VEGETABLE)
                      .authorImage("Author")
                      .urlImage("/vegetables/pineapple")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(4)
                      .ingredientName("Ham")
                      .ingredientType(IngredientType.MEAT)
                      .authorImage("Author")
                      .urlImage("/meat/ham")
                      .build()
      );
   }
}
