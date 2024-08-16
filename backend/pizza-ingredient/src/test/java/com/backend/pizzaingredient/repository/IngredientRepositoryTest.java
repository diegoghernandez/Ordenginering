package com.backend.pizzaingredient.repository;

import com.backend.pizzaingredient.persistence.entity.Languages;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.setup.containers.MysqlTestContainer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class IngredientRepositoryTest implements MysqlTestContainer {

   @Autowired
   private IngredientRepository ingredientRepository;


   @Test
   @DisplayName("Should return the id with the desire name if exist")
   void findByIngredientName() {
      var ingredientIdEN = ingredientRepository.findByNameIfExist("Pineapple");
      var ingredientIdES = ingredientRepository.findByNameIfExist("Piña");
      var ingredientId404 = ingredientRepository.findByNameIfExist("fsadfsa");

      assertAll(
              () -> assertTrue(ingredientIdEN.isPresent()),
              () -> assertEquals(3, ingredientIdEN.get()),
              () -> assertTrue(ingredientIdES.isPresent()),
              () -> assertEquals(3, ingredientIdES.get()),
              () -> assertTrue(ingredientId404.isEmpty())
      );
   }

   @Test
   @DisplayName("Should return the name with the desire id if exist")
   void findByIdIngredient() {
      var ingredientName = ingredientRepository.findByIdIngredient(4);
      var ingredientName404 = ingredientRepository.findByIdIngredient(453252);

      var expectedIngredientName = Languages.builder()
              .en("Ham")
              .es("Jamón")
              .build();

      assertAll(
              () -> assertTrue(ingredientName.isPresent()),
              () -> assertEquals(expectedIngredientName, ingredientName.get()),
              () -> assertTrue(ingredientName404.isEmpty())
      );
   }
}
