package com.backend.pizzaingredient.service;

import com.backend.pizzaingredient.TestIngredientUtil;
import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.setup.containers.SetUpForServiceWithContainers;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class IngredientServiceImplTest extends SetUpForServiceWithContainers {

   @Autowired
   private IngredientService ingredientService;

   @Autowired
   private IngredientRepository ingredientRepository;

   @Test
   @DisplayName("Should return all ingredients available using the repository")
   void getAllIngredients() {
      assertThat(TestIngredientUtil.getIngredientList().stream().map(IngredientEntity::toString).toList())
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
   void saveIngredient() throws NotAllowedException {
      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredient(new IngredientDto(
                      "Pepperoni",
                      IngredientType.VEGETABLE,
                      "/meat/peperoni",
                      "Author"
              )));

      ingredientService.saveIngredient(new IngredientDto(
              "Good",
              IngredientType.VEGETABLE,
              "/meat/peperoni",
              "Author"
      ));

      var ingredientEntity = IngredientEntity.builder()
              .idIngredient(5)
              .ingredientName("Good")
              .ingredientType(IngredientType.VEGETABLE)
              .authorImage("Author")
              .urlImage("/meat/peperoni")
              .build();

      assertAll(
              () -> assertEquals(exception.getMessage(), "Repeat names are not allowed"),
              () -> assertEquals(ingredientEntity.toString(), ingredientRepository.findById(5).get().toString())
      );
   }

   @Test
   @DisplayName("Should convert all ingredientDto to ingredientEntity, and send them to the repository")
   void saveIngredientList() throws NotAllowedException {
      var ingredientDtoList = List.of(
              new IngredientDto(
                 "Cheese",
                      IngredientType.CHEESE,
                 "/meat/peperoni",
                 "Author"
              ),
              new IngredientDto(
                 "Lettuce",
                      IngredientType.VEGETABLE,
                 "/meat/peperoni",
                 "Author"
              )
      );

      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredientList(Collections.singletonList(new IngredientDto(
                      "Pepperoni",
                      IngredientType.VEGETABLE,
                      "/meat/peperoni",
                      "Author"
              ))));

      ingredientService.saveIngredientList(ingredientDtoList);

      var allIngredients = ingredientRepository.findAll();
      var ingredientsSaved = List.of(allIngredients.get(allIngredients.size() -2), allIngredients.getLast()).toString();

      var ingredientsExpected = List.of(
              IngredientEntity.builder()
                      .idIngredient(6)
                      .ingredientName("Cheese")
                      .ingredientType(IngredientType.CHEESE)
                      .authorImage("Author")
                      .urlImage("/meat/peperoni")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(7)
                      .ingredientName("Lettuce")
                      .ingredientType(IngredientType.VEGETABLE)
                      .authorImage("Author")
                      .urlImage("/meat/peperoni")
                      .build()
      ).toString();

      assertAll(
              () -> assertEquals(exception.getMessage(), "Repeat names are not allowed"),
              () -> assertEquals(ingredientsExpected, ingredientsSaved)
      );
   }
}