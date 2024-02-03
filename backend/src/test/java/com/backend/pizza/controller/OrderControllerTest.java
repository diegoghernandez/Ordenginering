package com.backend.pizza.controller;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.constants.Size;
import com.backend.pizza.domain.service.OrderService;
import com.backend.pizza.web.OrderController;
import com.backend.pizza.web.dto.IngredientDto;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;
import com.backend.pizza.web.dto.OrderDto;
import com.backend.pizza.web.dto.PizzaDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertAll;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private OrderService orderService;

   @Test
   @DisplayName("Should return all orders in json format with a specific customer id using the service or return a not found")
   void getOrdersByAccount() {
      Mockito.when(orderService.getOrdersByAccount(34))
              .thenReturn(TestDataUtil.getOrderList());


      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/account/6456546")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/account/34")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestDataUtil.getOrderList())))

      );
   }

   @Test
   @DisplayName("Should save one orderDto using the service")
   void saveOrder() throws Exception {
      var orderDto = new OrderDto(
              4324,
              "México",
              "City",
              "Strreet",
              42342,
              null,
              null,
              List.of(
                      new PizzaDto(
                              UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"),
                             "Pepperoni",
                             Size.MEDIUM,
                             2,
                              Arrays.asList(2, 4, 5)
                      ),
                      new PizzaDto(
                              UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"),
                             "Hawaiana",
                             Size.MEDIUM,
                             2,
                              Arrays.asList(1, 2, 4, 5)
                      )
              )
      );

      var objectMapper = new ObjectMapper();

      Mockito.doNothing().when(orderService).saveOrder(Mockito.eq(orderDto));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.post("/order/save")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(orderDto)))
                      .andExpect(MockMvcResultMatchers.status().isCreated())
                      .andExpect(MockMvcResultMatchers.content().string("Order save correctly")),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .saveOrder(Mockito.eq(orderDto))

      );
   }
}