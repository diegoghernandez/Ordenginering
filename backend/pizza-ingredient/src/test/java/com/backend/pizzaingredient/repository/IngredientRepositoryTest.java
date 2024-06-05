package com.backend.pizzaingredient.repository;

import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.setup.containers.SetUpForTestWithContainers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class IngredientRepositoryTest extends SetUpForTestWithContainers {

   @Autowired
   private IngredientRepository ingredientRepository;

   @Test
   @DisplayName("Should return a boolean depending of the response")
   void existsByIngredientName() {
      boolean ingredientFound = ingredientRepository.existsByIngredientName("Mozzarella");
      boolean ingredientNotFound = ingredientRepository.existsByIngredientName("fsadfsa");

      assertAll(
              () -> assertTrue(ingredientFound),
              () -> assertFalse(ingredientNotFound)
      );
   }

   @Test
   @DisplayName("Should return the id with the desire name if exist")
   void findByIngredientName() {
      var ingredientId = ingredientRepository.findByIngredientName("Mozzarella");
      var ingredientId404 = ingredientRepository.findByIngredientName("fsadfsa");

      assertAll(
              () -> assertTrue(ingredientId.isPresent()),
              () -> assertEquals(2, ingredientId.get()),
              () -> assertTrue(ingredientId404.isEmpty())
      );
   }

   @Test
   @DisplayName("Should return the name with the desire id if exist")
   void findByIdIngredient() {
      var ingredientName = ingredientRepository.findByIdIngredient(2);
      var ingredientName404 = ingredientRepository.findByIdIngredient(453252);

      assertAll(
              () -> assertTrue(ingredientName.isPresent()),
              () -> assertEquals("Mozzarella", ingredientName.get()),
              () -> assertTrue(ingredientName404.isEmpty())
      );
   }
}
