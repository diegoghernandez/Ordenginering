package com.backend.pizzadata.controller;

import com.backend.pizzadata.TestDataUtil;
import com.backend.pizzadata.advice.PizzaDataExceptionHandler;
import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.setup.client.SetUpForJwtClient;
import com.backend.pizzadata.web.OrderController;
import com.backend.pizzadata.web.config.JwtFilter;
import com.backend.pizzadata.web.domain.IngredientDomain;
import com.backend.pizzadata.web.domain.OrderDomain;
import com.backend.pizzadata.web.domain.PizzaDomain;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("test")
class OrderControllerTest extends SetUpForJwtClient {

   private MockMvc mockMvc;

   @Autowired
   private OrderController orderController;

   @MockBean
   private OrderService orderService;

   @Autowired
   private JwtFilter jwtFilter;

   @BeforeEach
   public void setUp() {
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      this.mockMvc = MockMvcBuilders.standaloneSetup(orderController)
              .setControllerAdvice(new PizzaDataExceptionHandler())
              .addFilter(jwtFilter)
              .setMessageConverters(
                      new StringHttpMessageConverter(),
                      new MappingJackson2HttpMessageConverter(objectMapper)
              ).build();
   }

   @Test
   @DisplayName("Should return the desire order in json format with its specific id using the service or return a not found")
   void getOrdersById() {
      var orderEntity = TestDataUtil.getOrderList().getContent().getFirst();

      Mockito.when(orderService.getOrderById(UUID.fromString("a9efb332-be7e-4498-9f52-80dcb781c1ef")))
              .thenReturn(Optional.empty());

      Mockito.when(orderService.getOrderById(UUID.fromString("abdd83f3-61ea-4428-991d-f80b5479736e")))
              .thenReturn(Optional.of(orderEntity));

      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/a9efb332-be7e-4498-9f52-80dcb781c1ef")
                              .cookie(TestDataUtil.getCookie())
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .getOrderById(UUID.fromString("a9efb332-be7e-4498-9f52-80dcb781c1ef")),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/abdd83f3-61ea-4428-991d-f80b5479736e")
                              .cookie(TestDataUtil.getCookie())
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(orderEntity))),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .getOrderById(UUID.fromString("abdd83f3-61ea-4428-991d-f80b5479736e"))
      );
   }

   @Test
   @DisplayName("Should return all orders in json format with a specific customer id using the service or return a not found")
   void getOrdersByAccount() {
      Mockito.when(orderService.getOrdersByCustomerId(6456546L, 0))
              .thenReturn(Optional.of(new PageImpl<>(List.of())));

      Mockito.when(orderService.getOrdersByCustomerId(4234L, 0))
              .thenReturn(Optional.of(TestDataUtil.getOrderList()));

      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      var orderDomain = TestDataUtil.getOrderList().map((order) -> new OrderDomain(
              order.getIdOrder(),
              order.getCountry(),
              order.getState(),
              order.getCity(),
              order.getStreet(),
              order.getHouseNumber(),
              null,
              null,
              order.getTotal(),
              order.getOrderTimestamp(),
              order.getPizzaList()
                      .stream().map((pizzaEntity) -> new PizzaDomain(
                              pizzaEntity.getIdPizza(),
                              pizzaEntity.getPizzaName(),
                              pizzaEntity.getPizzaImageUrl(),
                              pizzaEntity.getPizzaImageAuthor(),
                              pizzaEntity.getPrice(),
                              pizzaEntity.getSize(),
                              pizzaEntity.getQuantity(),
                              pizzaEntity.getPizzaIngredients()
                                      .stream().map((pizzaIngredients) -> new IngredientDomain(
                                              pizzaIngredients.getIngredientEntity().getIngredientName(),
                                              pizzaIngredients.getIngredientQuantity()
                                      )).toList()
                      )).toList()
      ));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/customer/6456546")
                              .param("page", "0")
                              .cookie(TestDataUtil.getCookie())
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .getOrdersByCustomerId(6456546L, 0),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/order/customer/4234")
                              .param("page", "0")
                              .cookie(TestDataUtil.getCookie())
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(orderDomain))),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .getOrdersByCustomerId(4234L, 0)

      );
   }

   @Test
   @DisplayName("Should save one orderDto using the service")
   void saveOrder() throws NotAllowedException {
      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      Mockito.doNothing().when(orderService)
              .saveOrder(Mockito.eq(TestDataUtil.getOrderDto()), Mockito.eq(TestDataUtil.getCookie()));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.post("/order/save")
                              .contentType(MediaType.APPLICATION_JSON)
                              .cookie(TestDataUtil.getCookie())
                              .content(objectMapper.writeValueAsString(TestDataUtil.getOrderDto())))
                      .andExpect(MockMvcResultMatchers.status().isCreated())
                      .andExpect(MockMvcResultMatchers.content().string("Order save correctly")),

              () -> Mockito.verify(orderService, Mockito.times(1))
                      .saveOrder(Mockito.eq(TestDataUtil.getOrderDto()), Mockito.eq(TestDataUtil.getCookie()))

      );
   }
}