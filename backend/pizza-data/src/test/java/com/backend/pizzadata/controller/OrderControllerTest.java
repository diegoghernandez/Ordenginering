package com.backend.pizzadata.controller;

import com.backend.pizzadata.TestDataUtil;
import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.web.OrderController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Optional;

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
      Mockito.when(orderService.getOrdersByAccount(6456546L, 0))
              .thenReturn(Optional.of(new PageImpl<>(List.of())));

      Mockito.when(orderService.getOrdersByAccount(4234L, 0))
              .thenReturn(Optional.of(TestDataUtil.getOrderList()));

      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/account/6456546")
                              .param("page", "0")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/account/4234")
                              .param("page", "0")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestDataUtil.getOrderList())))

      );
   }

   @Test
   @DisplayName("Should save one orderDto using the service")
   void saveOrder() throws NotAllowedException {
      var objectMapper = new ObjectMapper();

      Mockito.doNothing().when(orderService).saveOrder(Mockito.eq(TestDataUtil.getOrderDto()));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.post("/order/save")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(TestDataUtil.getOrderDto())))
                      .andExpect(MockMvcResultMatchers.status().isCreated())
                      .andExpect(MockMvcResultMatchers.content().string("Order save correctly")),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .saveOrder(Mockito.eq(TestDataUtil.getOrderDto()))

      );
   }
}