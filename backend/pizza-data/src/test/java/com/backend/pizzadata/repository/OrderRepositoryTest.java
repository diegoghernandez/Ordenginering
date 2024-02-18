package com.backend.pizzadata.repository;

import com.backend.pizzadata.TestDataUtil;
import com.backend.pizzadata.containers.SetUpForTestWithContainers;
import com.backend.pizzadata.persistence.entity.PizzaEntity;
import com.backend.pizzadata.persistence.repository.OrderRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Pageable;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class OrderRepositoryTest extends SetUpForTestWithContainers {

   @Autowired
   private OrderRepository orderRepository;

   @Test
   @DisplayName("Should return one all orders with the a specific customer id using the database")
   void findByIdCustomer() {
      var orderEntityPage = orderRepository.findByIdCustomer(4234L, Pageable.ofSize(5)).get();

      var order = orderEntityPage.get().toList().getFirst();

      assertAll(
              () -> assertEquals(1, orderEntityPage.getTotalElements()),
              () -> assertEquals(TestDataUtil.getOrderList().get().toList().toString(), Collections.singletonList(order).toString()),
              () -> assertEquals(TestDataUtil.getPizzaList().toString(), order.getPizzaList().toString()),
              () -> assertEquals(5, order.getPizzaList().stream().map(PizzaEntity::getIngredientEntities).flatMap(Collection::stream).toList().size())
      );
   }
}