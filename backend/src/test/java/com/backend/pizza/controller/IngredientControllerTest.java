package com.backend.pizza.controller;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.domain.service.IngredientService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.web.IngredientController;
import com.backend.pizza.web.dto.IngredientDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@WebMvcTest(IngredientController.class)
class IngredientControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private IngredientService ingredientService;

   @Test
   void getAllIngredients__NOT__FOUND() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(List.of());

      mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/all")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isNotFound());
   }

   @Test
   void getAllIngredients__OK() throws Exception {
      Mockito.when(ingredientService.getAllIngredients())
              .thenReturn(TestDataUtil.getIngredientList());

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/all")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestDataUtil.getIngredientList())));
   }

   @Test
   void saveIngredient__BAD__REQUEST() throws Exception {
      Mockito.doThrow(new NotAllowedException("No repeat name"))
              .when(ingredientService).saveIngredient(Mockito.isA(IngredientDto.class));

      var ingredientDto =  new IngredientDto(
              "Repeat name",
              "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
              "Author"
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/save/one")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDto)))
              .andExpect(MockMvcResultMatchers.status().isBadRequest())
              .andExpect(MockMvcResultMatchers.content().string("No repeat name"));
   }

   @Test
   void saveIngredient__OK() throws Exception {
      Mockito.doNothing().when(ingredientService).saveIngredient(Mockito.isA(IngredientDto.class));

      var ingredientDto =  new IngredientDto(
              "Good",
              "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
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
   void saveIngredientList__BAD__REQUEST() throws Exception {
      Mockito.doThrow(new NotAllowedException("No repeat name"))
              .when(ingredientService).saveIngredientList(Mockito.anyList());

      var ingredientDtoList = List.of(
              new IngredientDto(
                 "Repeat",
                 "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                 "Author"
              ),
              new IngredientDto(
                 "Repeat",
                 "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                 "Author"
              )
      );

      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.post("/ingredient/save/list")
                      .contentType(MediaType.APPLICATION_JSON)
                      .content(objectMapper.writeValueAsString(ingredientDtoList)))
              .andExpect(MockMvcResultMatchers.status().isBadRequest())
              .andExpect(MockMvcResultMatchers.content().string("No repeat name"));
   }

   @Test
   void saveIngredientList__OK() throws Exception {
      Mockito.doNothing().when(ingredientService).saveIngredientList(Mockito.anyList());

      var ingredientDtoList = List.of(
              new IngredientDto(
                      "Good 1",
                      "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
                      "Author"
              ),
              new IngredientDto(
                      "Good 2",
                      "https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/",
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