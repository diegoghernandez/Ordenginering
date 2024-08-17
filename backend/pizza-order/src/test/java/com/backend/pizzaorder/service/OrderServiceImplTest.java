package com.backend.pizzaorder.service;

import com.backend.pizzaorder.TestDataUtil;
import com.backend.pizzaorder.constants.Size;
import com.backend.pizzaorder.domain.service.OrderService;
import com.backend.pizzaorder.exceptions.NotAllowedException;
import com.backend.pizzaorder.persistence.entity.Languages;
import com.backend.pizzaorder.persistence.entity.OrderEntity;
import com.backend.pizzaorder.persistence.entity.PizzaEntity;
import com.backend.pizzaorder.persistence.entity.PizzaIngredients;
import com.backend.pizzaorder.setup.client.CustomerClientWireMock;
import com.backend.pizzaorder.setup.client.IngredientClientWireMock;
import com.backend.pizzaorder.setup.containers.MysqlTestContainer;
import com.backend.pizzaorder.web.dto.IngredientNameDto;
import com.backend.pizzaorder.web.dto.OrderDto;
import com.backend.pizzaorder.web.dto.PizzaDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@EnableFeignClients
@ComponentScan(basePackages = "com.backend.pizzaorder.domain")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ImportAutoConfiguration({ FeignAutoConfiguration.class, HttpMessageConvertersAutoConfiguration.class })
class OrderServiceImplTest implements MysqlTestContainer, CustomerClientWireMock, IngredientClientWireMock {

   @Autowired
   private OrderService orderService;

   @Test
   @DisplayName("Should return all orders with the a specific customer id using the repository")
   void getOrdersByCustomerId() {
      var orderList = orderService.getOrdersByCustomerId(4234L, 0).get();
      var emptyList = orderService.getOrdersByCustomerId(86579L, 0).get();

      var pizzaList = orderList.stream().flatMap((orderEntity) -> orderEntity.getPizzaList().stream()).toList();

      assertAll(
              () -> assertTrue(emptyList.isEmpty()),
              () -> assertEquals(TestDataUtil.getOrderList().toString(), orderList.toString()),
              () -> assertEquals(TestDataUtil.getPizzaList().toString(), pizzaList.toString()),
              () -> assertEquals(5, pizzaList.stream()
                      .flatMap((pizzaEntity -> pizzaEntity.getPizzaIngredients().stream())).toList().size())
      );
   }

   @Test
   @DisplayName("Should convert one orderDto to orderEntity, and send it to the repository")
   void saveOrder() throws NotAllowedException {
      assertEquals(0, orderService.getOrdersByCustomerId(2L, 0).get().getTotalElements());

      var customerException = assertThrows(NotAllowedException.class, () -> orderService.saveOrder(
              new OrderDto(54235L, null, null, null, null, 32, null, null, null),
              TestDataUtil.getCookie())
      );

      var ingredientException = assertThrows(NotAllowedException.class, () -> orderService.saveOrder(
              new OrderDto(2L, null, null, null, null, 32, null, null, List.of(
                      new PizzaDto(null, null, null, Size.MEDIUM, 32, List.of(
                              new IngredientNameDto(3213, 1)
                      ))
              )),
              TestDataUtil.getCookie())
      );

      orderService.saveOrder(TestDataUtil.getOrderDto(), TestDataUtil.getCookie());

      var pageOrderSaved = orderService.getOrdersByCustomerId(2L, 0).get();
      var order = pageOrderSaved.get().toList().getFirst();

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
                      .pizzaName(Languages.builder()
                              .en("Pepperoni")
                              .es("Pepperoni")
                              .build())
                      .pizzaImageName("url")
                      .pizzaImageAuthor(Languages.builder()
                                      .en("author")
                                      .es("autor")
                                      .build())
                      .price(140)
                      .size(Size.MEDIUM)
                      .quantity(1)
                      .pizzaIngredients(Set.of(PizzaIngredients.builder().idIngredient(1).build()))
                      .build(),
              PizzaEntity.builder()
                      .pizzaName(Languages.builder()
                              .en("Hawaiana")
                              .es("Hawaiana")
                              .build())
                      .pizzaImageName("url")
                      .pizzaImageAuthor(Languages.builder()
                                      .en("author")
                                      .es("autor")
                                      .build())
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