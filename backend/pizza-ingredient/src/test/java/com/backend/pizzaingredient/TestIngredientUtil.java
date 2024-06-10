package com.backend.pizzaingredient;

import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
                      .ingredientName("Pepperoni")
                      .ingredientType(IngredientType.MEAT)
                      .authorImage("Author")
                      .fileNameImage("peperoni.jpg")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(2)
                      .ingredientName("Mozzarella")
                      .ingredientType(IngredientType.CHEESE)
                      .authorImage("Author")
                      .fileNameImage("mozzarella.jpg")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(3)
                      .ingredientName("Pineapple")
                      .ingredientType(IngredientType.VEGETABLE)
                      .authorImage("Author")
                      .fileNameImage("pineapple.jpg")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(4)
                      .ingredientName("Ham")
                      .ingredientType(IngredientType.MEAT)
                      .authorImage("Author")
                      .fileNameImage("ham.jpg")
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

      return new MockMultipartFile("file", "image.jpg",
              MediaType.IMAGE_JPEG_VALUE, byteArray);
   }
}
