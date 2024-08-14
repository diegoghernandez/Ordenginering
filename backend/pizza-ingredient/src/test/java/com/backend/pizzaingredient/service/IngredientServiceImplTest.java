package com.backend.pizzaingredient.service;

import com.backend.pizzaingredient.TestIngredientUtil;
import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.entity.IngredientName;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.setup.containers.MysqlTestContainer;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
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
   @DisplayName("Should check if the id exist in the repository")
   void existIngredientId() {
      var ingredientIdExist = ingredientService.existIngredientId(3);
      var ingredientIdNotExist = ingredientService.existIngredientId(423423);

      assertAll(
              () -> assertTrue(ingredientIdExist),
              () -> assertFalse(ingredientIdNotExist)
      );
   }

   @Test
   @DisplayName("Should return the desire name with the id using the repository if exist")
   void getIngredientNameById() {
      var ingredientId = ingredientService.getIngredientNameById(3);
      var ingredientId404 = ingredientService.getIngredientNameById(423423);

      var ingredientName = IngredientName.builder()
              .en("Pineapple")
              .es("Piña")
              .build();

      assertAll(
              () -> assertTrue(ingredientId.isPresent()),
              () -> assertEquals(ingredientName, ingredientId.get()),
              () -> assertTrue(ingredientId404.isEmpty())
      );
   }

   @Test
   @DisplayName("Should convert one ingredientDto to ingredientEntity, and send it to the repository")
   void saveIngredient() throws NotAllowedException, IOException {
      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredient(new IngredientDto(
                      IngredientName.builder()
                              .en("Pepperoni")
                              .es("Nuevo")
                              .build(),
                      IngredientType.VEGETABLE,
                      "Author"
              ), TestIngredientUtil.getImageFile()));

      ingredientService.saveIngredient(new IngredientDto(
              IngredientName.builder()
                      .en("Good")
                      .es("Bueno")
                      .build(),
              IngredientType.VEGETABLE,
              "Author"
      ), TestIngredientUtil.getImageFile());

      var ingredientEntity = IngredientEntity.builder()
              .idIngredient(5)
              .ingredientName(IngredientName.builder()
                      .en("Good")
                      .es("Bueno")
                      .build())
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