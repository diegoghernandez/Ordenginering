package com.backend.pizzaingredient.controller;

import com.backend.pizzaingredient.TestIngredientUtil;
import com.backend.pizzaingredient.advice.PizzaDataExceptionHandler;
import com.backend.pizzaingredient.constants.IngredientType;
import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientName;
import com.backend.pizzaingredient.web.IngredientController;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("test")
class IngredientControllerTest {

   private MockMvc mockMvc;

   @Autowired
   private IngredientController ingredientController;

   @MockBean
   private IngredientService ingredientService;

   @BeforeEach
   public void setUp() {
      this.mockMvc = MockMvcBuilders.standaloneSetup(ingredientController)
              .setControllerAdvice(new PizzaDataExceptionHandler())
              .build();
   }

   @Test
   @DisplayName("Should return a not found status instead of all ingredients")
   void getAllIngredients__NOT__FOUND() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(List.of());

      mockMvc.perform(MockMvcRequestBuilders.get("/")
                      .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isNotFound());
   }

   @Test
   @DisplayName("Should return all ingredients available using the repository if exist")
   void getAllIngredients__OK() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(TestIngredientUtil.getIngredientList());

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.get("/")
                      .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestIngredientUtil.getIngredientList())));
   }

   @Test
   @DisplayName("Should check if the id exist using the service and return a head response")
   void existIngredientId() {
      var validId = 1;
      var invalidId = 4423432;

      Mockito.when(ingredientService.existIngredientId(validId))
              .thenReturn(true);

      Mockito.when(ingredientService.existIngredientId(invalidId))
              .thenReturn(false);

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.head("/id/" + invalidId))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .existIngredientId(invalidId),

              () -> mockMvc.perform(MockMvcRequestBuilders.head("/id/" + validId))
                      .andExpect(MockMvcResultMatchers.status().isOk()),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .existIngredientId(validId)
      );
   }

   @Test
   @DisplayName("Should return the desire name with the id using the service if exist")
   void getIngredientNameById() {
      var ingredientName = IngredientName.builder()
              .en("Pineapple")
              .es("Piña")
              .build();

      Mockito.when(ingredientService.getIngredientNameById(45325))
              .thenReturn(Optional.empty());

      Mockito.when(ingredientService.getIngredientNameById(1))
              .thenReturn(Optional.of(ingredientName));

      var objectMapper = new ObjectMapper();

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/id/45325")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIngredientNameById(45325),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/id/1")
                              .contentType(MediaType.APPLICATION_JSON_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(ingredientName))),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .getIngredientNameById(1)
      );
   }

   @Test
   @DisplayName("Should save one ingredientDto using the service or catch an error with a bad message")
   void saveIngredient() throws Exception {
      var ingredientDtoError = new IngredientDto(
              IngredientName.builder()
                      .en("Repeat name")
                      .es("Nombre repetido")
                      .build(),
              IngredientType.VEGETABLE,
              "Author"
      );

      var ingredientDto = new IngredientDto(
              IngredientName.builder()
                      .en("Good")
                      .es("Bueno")
                      .build(),
              IngredientType.VEGETABLE,
              "Author"
      );

      Mockito.doThrow(new NotAllowedException("No repeat name")).when(ingredientService)
              .saveIngredient(Mockito.eq(ingredientDtoError), Mockito.isA(MockMultipartFile.class));

      Mockito.doNothing().when(ingredientService)
              .saveIngredient(Mockito.eq(ingredientDto), Mockito.isA(MockMultipartFile.class));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.multipart("/")
                              .file(TestIngredientUtil.getIngredientFile(ingredientDto))
                              .file(new MockMultipartFile("file", "image.jpg",
                                      MediaType.IMAGE_JPEG_VALUE, (byte[]) null))
                              .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isBadRequest())
                      .andExpect(MockMvcResultMatchers.content().string("Image is required")),

              () -> Mockito.verify(ingredientService, Mockito.times(0))
                      .saveIngredient(Mockito.eq(ingredientDto), Mockito.isA(MockMultipartFile.class)),

              () -> mockMvc.perform(MockMvcRequestBuilders.multipart("/")
                              .file(TestIngredientUtil.getIngredientFile(ingredientDto))
                              .file(new MockMultipartFile("file", "image.webp",
                                      "image/webp", Files.readAllBytes(Path.of("src/test/resources/test.webp"))
                              ))
                              .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isBadRequest())
                      .andExpect(MockMvcResultMatchers.content().string("Image type is not one of the following supported: jpeg, png, bmp, webmp, gif")),

              () -> Mockito.verify(ingredientService, Mockito.times(0))
                      .saveIngredient(Mockito.eq(ingredientDto), Mockito.isA(MockMultipartFile.class)),

              () -> mockMvc.perform(MockMvcRequestBuilders.multipart("/")
                              .file(TestIngredientUtil.getIngredientFile(ingredientDtoError))
                              .file(TestIngredientUtil.getImageFile())
                              .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isBadRequest())
                      .andExpect(MockMvcResultMatchers.content().string("{\"desc\":\"No repeat name\",\"fieldError\":null}")),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .saveIngredient(Mockito.eq(ingredientDtoError), Mockito.isA(MockMultipartFile.class)),

              () -> mockMvc.perform(MockMvcRequestBuilders.multipart("/")
                              .file(TestIngredientUtil.getIngredientFile(ingredientDto))
                              .file(TestIngredientUtil.getImageFile())
                              .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("Ingredient save correctly")),

              () -> Mockito.verify(ingredientService, Mockito.times(1))
                      .saveIngredient(Mockito.eq(ingredientDto), Mockito.isA(MockMultipartFile.class))
      );
   }
}