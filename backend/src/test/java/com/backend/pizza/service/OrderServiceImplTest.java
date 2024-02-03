package com.backend.pizza.service;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.domain.service.OrderService;
import com.backend.pizza.persistence.entity.OrderEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class OrderServiceImplTest {

   @Autowired
   private OrderService orderService;

   @Test
   @DisplayName("Should return one all orders with the a specific customer id using the repository")
   void getOrdersByAccount() {
      var listOrder = orderService.getOrdersByAccount(23);

      assertThat(listOrder.stream().map(OrderEntity::toString).toList())
              .hasSameElementsAs(TestDataUtil.getOrderList().stream().map(OrderEntity::toString).toList());
   }

   @Test
   @DisplayName("Should convert one orderDto to orderEntity, and send it to the repository")
   void saveOrder() {
   }
}