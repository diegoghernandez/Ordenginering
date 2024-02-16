package com.backend.pizza.service;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.containers.SetUpForServiceTestWithContainers;
import com.backend.pizza.domain.service.IngredientService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.persistence.repository.IngredientRepository;
import com.backend.pizza.web.dto.IngredientDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class IngredientServiceImplTest extends SetUpForServiceTestWithContainers {

   @Autowired
   private IngredientService ingredientService;

   @Autowired
   private IngredientRepository ingredientRepository;

   @Test
   @DisplayName("Should return all ingredients available using the repository")
   void getAllIngredients() {
      assertThat(TestDataUtil.getIngredientList().stream().map(IngredientEntity::toString).toList())
              .hasSameElementsAs(ingredientService.getAllIngredients().stream().map(IngredientEntity::toString).toList());
   }

   @Test
   @DisplayName("Should convert one ingredientDto to ingredientEntity, and send it to the repository")
   void saveIngredient() throws NotAllowedException {
      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredient(new IngredientDto(
                      "No repeat",
                      "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                      "Author"
              )));

      ingredientService.saveIngredient(new IngredientDto(
              "Good",
              "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
              "Author"
      ));

      var ingredientEntity = IngredientEntity.builder()
              .idIngredient(5)
              .ingredientName("Good")
              .authorImage("Author")
              .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
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
                 "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                 "Author"
              ),
              new IngredientDto(
                 "Lettuce",
                 "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                 "Author"
              )
      );

      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredientList(Collections.singletonList(new IngredientDto(
                      "No repeat",
                      "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                      "Author"
              ))));

      ingredientService.saveIngredientList(ingredientDtoList);

      var allIngredients = ingredientRepository.findAll();
      var ingredientsSaved = List.of(allIngredients.get(allIngredients.size() -2), allIngredients.getLast()).toString();

      var ingredientsExpected = List.of(
              IngredientEntity.builder()
                      .idIngredient(6)
                      .ingredientName("Cheese")
                      .authorImage("Author")
                      .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(7)
                      .ingredientName("Lettuce")
                      .authorImage("Author")
                      .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build()
      ).toString();

      assertAll(
              () -> assertEquals(exception.getMessage(), "Repeat names are not allowed"),
              () -> assertEquals(ingredientsExpected, ingredientsSaved)
      );
   }
}