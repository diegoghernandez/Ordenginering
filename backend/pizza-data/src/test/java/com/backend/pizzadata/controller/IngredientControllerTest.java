package com.backend.pizzadata.controller;

import com.backend.pizzadata.TestDataUtil;
import com.backend.pizzadata.advice.PizzaDataExceptionHandler;
import com.backend.pizzadata.constants.IngredientType;
import com.backend.pizzadata.domain.service.IngredientService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.web.IngredientController;
import com.backend.pizzadata.web.config.JwtFilter;
import com.backend.pizzadata.web.dto.IngredientDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

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

      mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/all")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isNotFound());
   }

   @Test
   @DisplayName("Should return all ingredients available using the repository if exist")
   void getAllIngredients__OK() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(TestDataUtil.getIngredientList());

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestDataUtil.getIngredientList())));
   }

   @Test
   @DisplayName("Should catch an error instead of save it and return a bad request with a message")
   void saveIngredient__BAD__REQUEST() throws Exception {
      Mockito.doThrow(new NotAllowedException("No repeat name"))
              .when(ingredientService).saveIngredient(Mockito.isA(IngredientDto.class));

      var ingredientDto =  new IngredientDto(
              "Repeat name",
              IngredientType.VEGETABLE,
              "/meat/peperoni",
              "Author"
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/save/one")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDto)))
              .andExpect(MockMvcResultMatchers.status().isBadRequest())
              .andExpect(MockMvcResultMatchers.content().string("{\"desc\":\"No repeat name\",\"fieldError\":null}"));
   }

   @Test
   @DisplayName("Should save one ingredientDto using the service")
   void saveIngredient__OK() throws Exception {
      Mockito.doNothing().when(ingredientService).saveIngredient(Mockito.isA(IngredientDto.class));

      var ingredientDto =  new IngredientDto(
              "Good",
              IngredientType.VEGETABLE,
              "/meat/peperoni",
              "Author"
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/save/one")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDto)))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().string("Ingredient save correctly"));
   }

   @Test
   @DisplayName("Should catch an error instead of save them and return a bad request with a message")
   void saveIngredientList__BAD__REQUEST() throws Exception {
      Mockito.doThrow(new NotAllowedException("No repeat name"))
              .when(ingredientService).saveIngredientList(Mockito.anyList());

      var ingredientDtoList = List.of(
              new IngredientDto(
                 "Repeat",
                 IngredientType.VEGETABLE,
                 "/meat/peperoni",
                 "Author"
              ),
              new IngredientDto(
                 "Repeat",
                 IngredientType.VEGETABLE,
                 "/meat/peperoni",
                 "Author"
              )
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/save/list")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDtoList)))
              .andExpect(MockMvcResultMatchers.status().isBadRequest())
              .andExpect(MockMvcResultMatchers.content().string("{\"desc\":\"No repeat name\",\"fieldError\":null}"));
   }

   @Test
   @DisplayName("Should save the ingredientDto list using the service")
   void saveIngredientList__OK() throws Exception {
      Mockito.doNothing().when(ingredientService).saveIngredientList(Mockito.anyList());

      var ingredientDtoList = List.of(
              new IngredientDto(
                      "Good 1",
                      IngredientType.VEGETABLE,
                      "/meat/peperoni",
                      "Author"
              ),
              new IngredientDto(
                      "Good 2",
                      IngredientType.VEGETABLE,
                      "/meat/peperoni",
                      "Author"
              )
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/save/list")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDtoList)))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().string("All ingredients save correctly"));
   }
}