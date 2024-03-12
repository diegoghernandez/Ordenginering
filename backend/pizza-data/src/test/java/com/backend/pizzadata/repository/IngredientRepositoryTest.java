package com.backend.pizzadata.repository;

import com.backend.pizzadata.containers.SetUpForTestWithContainers;
import com.backend.pizzadata.persistence.entity.IngredientEntity;
import com.backend.pizzadata.persistence.repository.IngredientRepository;
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
   @DisplayName("Should return one all orders with the a specific customer id using the database")
   void findByIngredientName() {
      Optional<IngredientEntity> ingredientEntity = ingredientRepository.findByIngredientName("Mozzarella");
      Optional<IngredientEntity> ingredientEntity404 = ingredientRepository.findByIngredientName("fsadfsa");

      assertAll(
              () -> assertTrue(ingredientEntity.isPresent()),
              () -> assertEquals("Mozzarella", ingredientEntity.get().getIngredientName()),
              () -> assertTrue(ingredientEntity404.isEmpty())
      );
   }
}
