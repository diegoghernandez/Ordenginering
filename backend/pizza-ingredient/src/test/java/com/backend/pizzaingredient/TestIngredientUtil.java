package com.backend.pizzaingredient;

import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.entity.Languages;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public final class TestIngredientUtil {

   public static List<IngredientEntity> getIngredientList() {

      return List.of(
              IngredientEntity.builder()
                      .idIngredient(1)
                      .ingredientName(Languages.builder()
                              .en("Pepperoni")
                              .es("Pepperoni")
                              .build())
                      .ingredientType(IngredientType.MEAT)
                      .authorImage(Languages.builder()
                      .en("Author")
                      .es("Autor")
                      .build())
                      .fileNameImage("peperoni")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(2)
                      .ingredientName(Languages.builder()
                              .en("Mozzarella")
                              .es("Mozzarella")
                              .build())
                      .ingredientType(IngredientType.CHEESE)
                      .authorImage(Languages.builder()
                      .en("Author")
                      .es("Autor")
                      .build())
                      .fileNameImage("mozzarella")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(3)
                      .ingredientName(Languages.builder()
                              .en("Pineapple")
                              .es("Piña")
                              .build())
                      .ingredientType(IngredientType.VEGETABLE)
                      .authorImage(Languages.builder()
                      .en("Author")
                      .es("Autor")
                      .build())
                      .fileNameImage("pineapple")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(4)
                      .ingredientName(Languages.builder()
                              .en("Ham")
                              .es("Jamón")
                              .build())
                      .ingredientType(IngredientType.MEAT)
                      .authorImage(Languages.builder()
                      .en("Author")
                      .es("Autor")
                      .build())
                      .fileNameImage("ham")
                      .build()
      );
   }

   public static MockMultipartFile getIngredientFile(IngredientDto ingredientDto) throws JsonProcessingException {
      var objectMapper = new ObjectMapper();

      return new MockMultipartFile("ingredient", null,
              MediaType.APPLICATION_JSON_VALUE, objectMapper.writeValueAsString(ingredientDto).getBytes());
   }

   public static MockMultipartFile getImageFile() throws IOException {
      var byteArray = Files.readAllBytes(Path.of("src/test/resources/test.jpg"));

      return new MockMultipartFile("file", "image",
              MediaType.IMAGE_JPEG_VALUE, byteArray);
   }

   public static Cookie getCookie() {
      return new Cookie("jwt", "token");
   }
}
