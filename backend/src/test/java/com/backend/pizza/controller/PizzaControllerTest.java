package com.backend.pizza.controller;

import com.backend.pizza.constants.Size;
import com.backend.pizza.persistence.entity.PizzaEntity;
import com.backend.pizza.web.PizzaController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertAll;

@WebMvcTest(PizzaController.class)
class PizzaControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @Test
   void getPizzaByAccount() throws Exception {
      var pizzaList = Arrays.asList(
              PizzaEntity.builder()
                      .idPizza(23L)
                      .idCustomer(321L)
                      .pizzaName("custom")
                      .price(3123.32)
                      .size(Size.LARGE)
                      .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                      .build(),

              PizzaEntity.builder()
                      .idPizza(23L)
                      .idCustomer(321L)
                      .pizzaName("custom")
                      .price(3123.32)
                      .size(Size.LARGE)
                      .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                      .build()
      );


      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      System.out.println(objectMapper.writeValueAsString(pizzaList));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/pizza/account/432432")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(pizzaList))),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/pizza/account/321980")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isNotFound())
      );
   }
}