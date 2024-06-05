package com.backend.pizzaorder.client;

import com.backend.pizzaorder.setup.client.SetUpForIngredientClient;
import com.backend.pizzaorder.web.api.IngredientClient;
import feign.FeignException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class IngredientClientTest extends SetUpForIngredientClient {

   @Autowired
   private IngredientClient ingredientClient;

   @Test
   @DisplayName("Should return the id of the desire ingredient if is found")
   void getIdByIngredientName() {
      var exception = assertThrows(FeignException.class, () -> ingredientClient.getIdByIngredientName("not-found"));

      assertAll(
              () -> assertEquals(ingredientClient.getIdByIngredientName("Pepperoni"), 1),
              () -> assertEquals(ingredientClient.getIdByIngredientName("Pineapple"), 3),
              () -> assertEquals(exception.status(), 404)
      );
   }

   @Test
   @DisplayName("Should return the name of the desire ingredient if is found")
   void getIngredientNameById() {
      var exception = assertThrows(FeignException.class, () -> ingredientClient.getIngredientNameById(8765));

      assertAll(
              () -> assertEquals(ingredientClient.getIngredientNameById(3), "Mozzarella"),
              () -> assertEquals(exception.status(), 404)
      );
   }
}
