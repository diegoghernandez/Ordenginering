package com.backend.pizza.service;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.domain.service.IngredientService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.persistence.repository.IngredientRepository;
import com.backend.pizza.web.dto.IngredientDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class IngredientServiceImplTest {

   @Autowired
   private IngredientService ingredientService;

   @MockBean
   private IngredientRepository ingredientRepository;

   @Test
   @DisplayName("Should return all ingredients available using the repository")
   void getAllIngredients() {
      Mockito.when(ingredientRepository.findAll())
                      .thenReturn(TestDataUtil.getIngredientList());

      assertThat(ingredientService.getAllIngredients().stream().map(IngredientEntity::toString).toList())
              .hasSameElementsAs(TestDataUtil.getIngredientList().stream().map(IngredientEntity::toString).toList());
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

      assertAll(
              () -> assertEquals(exception.getMessage(), "Repeat names are not allowed"),
              () -> Mockito.verify(ingredientRepository, Mockito.times(1))
                      .save(Mockito.isA(IngredientEntity.class))
      );
   }

   @Test
   @DisplayName("Should convert all ingredientDto to ingredientEntity, and send them to the repository")
   void saveIngredientList() {
      var ingredientDtoList = List.of(
              new IngredientDto(
                 "Good",
                 "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                 "Author"
              ),
              new IngredientDto(
                 "No repeat",
                 "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                 "Author"
              )
      );

      Exception exception = assertThrows(NotAllowedException.class,
              () -> ingredientService.saveIngredientList(ingredientDtoList));

      ingredientRepository.saveAll(List.of(IngredientEntity.builder().build()));

      assertAll(
              () -> assertEquals(exception.getMessage(), "Repeat names are not allowed"),
              () -> Mockito.verify(ingredientRepository, Mockito.times(1))
                      .saveAll(Mockito.anyList())
      );
   }
}