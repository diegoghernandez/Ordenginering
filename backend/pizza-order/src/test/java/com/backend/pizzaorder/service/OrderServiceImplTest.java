package com.backend.pizzaorder.service;

import com.backend.pizzaorder.TestDataUtil;
import com.backend.pizzaorder.constants.Size;
import com.backend.pizzaorder.domain.service.OrderService;
import com.backend.pizzaorder.exceptions.NotAllowedException;
import com.backend.pizzaorder.persistence.entity.OrderEntity;
import com.backend.pizzaorder.persistence.entity.PizzaEntity;
import com.backend.pizzaorder.persistence.entity.PizzaIngredients;
import com.backend.pizzaorder.setup.containers.SetUpForServiceWithContainers;
import com.backend.pizzaorder.web.dto.IngredientNameDto;
import com.backend.pizzaorder.web.dto.OrderDto;
import com.backend.pizzaorder.web.dto.PizzaDto;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.http.MediaType;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@EnableFeignClients
@ImportAutoConfiguration({ FeignAutoConfiguration.class, HttpMessageConvertersAutoConfiguration.class })
class OrderServiceImplTest extends SetUpForServiceWithContainers {

   @Autowired
   private OrderService orderService;

   @Test
   @DisplayName("Should return all orders with the a specific customer id using the repository")
   void getOrdersByCustomerId() {
      var orderList = orderService.getOrdersByCustomerId(4234L, 0).get();
      var emptyList = orderService.getOrdersByCustomerId(86579L, 0).get();

      var pizzaList = orderList.stream().flatMap((orderEntity) -> orderEntity.getPizzaList().stream()).toList();

      assertAll(
              () -> assertEquals(TestDataUtil.getOrderList().toString(), orderList.toString()),
              () -> assertEquals(TestDataUtil.getPizzaList().toString(), pizzaList.toString()),
              () -> assertEquals(5, pizzaList.stream().flatMap((pizzaEntity -> pizzaEntity.getPizzaIngredients().stream())).toList().size()),
              () -> assertTrue(emptyList.isEmpty())
      );
   }

   @Test
   @DisplayName("Should convert one orderDto to orderEntity, and send it to the repository")
   void saveOrder() throws NotAllowedException {
      var customerMockService = new WireMockServer(8765);
      var ingredientMockService = new WireMockServer(2222);
      customerMockService.start();
      ingredientMockService.start();

      customerMockService.stubFor(WireMock.head(WireMock.urlPathMatching("/customer/exist/2"))
              .willReturn(WireMock.status(200)));

      ingredientMockService.stubFor(WireMock.get(WireMock.urlPathMatching("/ingredient/name/Pepperoni"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("1").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      ingredientMockService.stubFor(WireMock.get(WireMock.urlPathMatching("/ingredient/name/Mozzarella"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("2").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      ingredientMockService.stubFor(WireMock.get(WireMock.urlPathMatching("/ingredient/name/Pineapple"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("3").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      ingredientMockService.stubFor(WireMock.get(WireMock.urlPathMatching("/ingredient/name/Ham"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("4").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      assertEquals(0, orderService.getOrdersByCustomerId(2L, 0).get().getTotalElements());

      var customerException = assertThrows(NotAllowedException.class, () -> orderService.saveOrder(
              new OrderDto(54235L, null, null, null, null, 32, null, null, null),
              TestDataUtil.getCookie())
      );

      var ingredientException = assertThrows(NotAllowedException.class, () -> orderService.saveOrder(
              new OrderDto(2L, null, null, null, null, 32, null, null, List.of(
                      new PizzaDto(null, null, null, Size.MEDIUM, 32, List.of(
                              new IngredientNameDto("Error", 1)
                      ))
              )),
              TestDataUtil.getCookie())
      );

      orderService.saveOrder(TestDataUtil.getOrderDto(), TestDataUtil.getCookie());

      var pageOrderSaved = orderService.getOrdersByCustomerId(2L, 0).get();
      var order = pageOrderSaved.get().toList().getFirst();

      customerMockService.stop();
      ingredientMockService.stop();

      var orderString = List.of(OrderEntity.builder()
              .idCustomer(2L)
              .country("México")
              .state("State")
              .city("City")
              .street("Street")
              .houseNumber(42342)
              .total(460)
              .build()).toString();

      var pizzaString = List.of(
              PizzaEntity.builder()
                      .pizzaName("Pepperoni")
                      .pizzaImageUrl("url")
                      .pizzaImageAuthor("author")
                      .price(140)
                      .size(Size.MEDIUM)
                      .quantity(1)
                      .pizzaIngredients(Set.of(PizzaIngredients.builder().idIngredient(1).build()))
                      .build(),
              PizzaEntity.builder()
                      .pizzaName("Hawaiana")
                      .pizzaImageUrl("url")
                      .pizzaImageAuthor("author")
                      .price(320)
                      .size(Size.MEDIUM)
                      .quantity(2)
                      .pizzaIngredients(Set.of(PizzaIngredients.builder().idIngredient(2).build()))
                      .build()
      ).toString();

      assertAll(
              () -> assertEquals(customerException.getMessage(), "Customer not found"),
              () -> assertEquals(ingredientException.getMessage(), "Ingredient doesn't exist"),
              () -> assertEquals(1, pageOrderSaved.getTotalElements()),
              () -> assertEquals(orderString, Collections.singletonList(order).toString()),
              () -> assertEquals(pizzaString, order.getPizzaList().toString()),
              () -> assertEquals(5, order.getPizzaList().stream().map(PizzaEntity::getPizzaIngredients).flatMap(Collection::stream).toList().size())
      );
   }
}