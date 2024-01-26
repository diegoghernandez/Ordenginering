package com.backend.pizza.controller;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.web.IngredientController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

@WebMvcTest(IngredientController.class)
class IngredientControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @Test
   void getAllIngredients() throws Exception {
      var objectMapper = new ObjectMapper();

      mockMvc.perform(MockMvcRequestBuilders.get("/ingredient/all")
                  .contentType(MediaType.APPLICATION_JSON))
              .andExpect(MockMvcResultMatchers.status().isOk())
              .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestDataUtil.getIngredientList())));
   }
}