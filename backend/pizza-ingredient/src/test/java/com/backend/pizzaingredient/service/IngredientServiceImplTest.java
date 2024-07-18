package com.backend.pizzaingredient.service;

import com.backend.pizzaingredient.TestIngredientUtil;
import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.setup.containers.MysqlTestContainer;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ComponentScan(basePackages = "com.backend.pizzaingredient.domain")
class IngredientServiceImplTest implements MysqlTestContainer {

   @Autowired
   private IngredientService ingredientService;

   @Autowired
   private IngredientRepository ingredientRepository;

   @Test
   @DisplayName("Should return all ingredients available using the repository")
   void getAllIngredients() {
      Assertions.assertThat(TestIngredientUtil.getIngredientList().stream().map(IngredientEntity::toString).toList())
              .hasSameElementsAs(ingredientService.getAllIngredients().stream().map(IngredientEntity::toString).toList());
   }

   @Test
   @DisplayName("Should return the desire id with the name using the repository if exist")
   void getIdByIngredientName() {
      var ingredientId = ingredientRepository.findByIngredientName("Pineapple");
      var ingredientId404 = ingredientRepository.findByIngredientName("fsadfsa");

      assertAll(
              () -> assertTrue(ingredientId.isPresent()),
              () -> assertEquals(3, ingredientId.get()),
              () -> assertTrue(ingredientId404.isEmpty())
      );
   }

   @Test
   @DisplayName("Should return the desire name with the id using the repository if exist")
   void getIngredientNameById() {
      var ingredientId = ingredientRepository.findByIdIngredient(3);
      var ingredientId404 = ingredientRepository.findByIdIngredient(423423);

      assertAll(
              () -> assertTrue(ingredientId.isPresent()),
              () -> assertEquals("Pineapple", ingredientId.get()),
              () -> assertTrue(ingredientId404.isEmpty())
      );
   }

   @Test
   @DisplayName("Should convert one ingredientDto to ingredientEntity, and send it to the repository")
   void saveIngredient() throws NotAllowedException, IOException {
      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredient(new IngredientDto(
                      "Pepperoni",
                      IngredientType.VEGETABLE,
                      "Author"
              ), TestIngredientUtil.getImageFile()));

      ingredientService.saveIngredient(new IngredientDto(
              "Good",
              IngredientType.VEGETABLE,
              "Author"
      ), TestIngredientUtil.getImageFile());

      var ingredientEntity = IngredientEntity.builder()
              .idIngredient(5)
              .ingredientName("Good")
              .ingredientType(IngredientType.VEGETABLE)
              .authorImage("Author")
              .fileNameImage("image")
              .build();

      assertAll(
              () -> assertEquals(exception.getMessage(), "Repeat names are not allowed"),
              () -> assertEquals(ingredientEntity.toString(), ingredientRepository.findById(5).get().toString())
      );
   }
}