package com.backend.pizzadata.service;

import com.backend.pizzadata.containers.SetUpForServiceTestWithContainers;
import com.backend.pizzadata.TestDataUtil;
import com.backend.pizzadata.constants.Size;
import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.persistence.entity.PizzaEntity;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class OrderServiceImplTest extends SetUpForServiceTestWithContainers {

   private final OrderService orderService;

   @Autowired
   public OrderServiceImplTest(OrderService orderService) {
      this.orderService = orderService;
   }

   @Test
   @DisplayName("Should return one all orders with the a specific customer id using the repository")
   void getOrdersByAccount() {
      var listOrder = orderService.getOrdersByAccount(4234L, 0);

      assertThat(TestDataUtil.getOrderList().stream().map(OrderEntity::toString).toList())
              .hasSameElementsAs(listOrder.get().stream().map(OrderEntity::toString).toList());
   }

   @Test
   @DisplayName("Should convert one orderDto to orderEntity, and send it to the repository")
   void saveOrder() throws NotAllowedException {
      assertEquals(0, orderService.getOrdersByAccount(2L, 0).get().getTotalElements());
      orderService.saveOrder(TestDataUtil.getOrderDto(), new Cookie("ds", "fdsa"));

      var pageOrderSaved = orderService.getOrdersByAccount(2L, 0).get();
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
                      .pizzaName("Pepperoni")
                      .price(140)
                      .size(Size.MEDIUM)
                      .quantity(1)
                      .build(),
              PizzaEntity.builder()
                      .pizzaName("Hawaiana")
                      .price(320)
                      .size(Size.MEDIUM)
                      .quantity(2)
                      .build()
      ).toString();

      assertAll(
              () -> assertEquals(1, pageOrderSaved.getTotalElements()),
              () -> assertEquals(orderString, Collections.singletonList(order).toString()),
              () -> assertEquals(pizzaString, order.getPizzaList().toString()),
              () -> assertEquals(5, order.getPizzaList().stream().map(PizzaEntity::getPizzaIngredients).flatMap(Collection::stream).toList().size())
      );
   }
}