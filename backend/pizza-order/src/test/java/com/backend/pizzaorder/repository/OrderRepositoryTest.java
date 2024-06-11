package com.backend.pizzaorder.repository;

import com.backend.pizzaorder.TestDataUtil;
import com.backend.pizzaorder.persistence.entity.PizzaEntity;
import com.backend.pizzaorder.persistence.repository.OrderRepository;
import com.backend.pizzaorder.setup.containers.MysqlTestContainer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class OrderRepositoryTest implements MysqlTestContainer {

   @Autowired
   private OrderRepository orderRepository;

   @Test
   @DisplayName("Should return one all orders with the a specific customer id using the database")
   void findByIdCustomer() {
      var orderEntityPage = orderRepository.findByIdCustomerOrderByOrderTimestampDesc(4234L, Pageable.ofSize(5)).get();

      var order = orderEntityPage.get().toList().getFirst();

      assertAll(
              () -> assertEquals(1, orderEntityPage.getTotalElements()),
              () -> assertEquals(TestDataUtil.getOrderList().get().toList().toString(), Collections.singletonList(order).toString()),
              () -> assertEquals(TestDataUtil.getPizzaList().toString(), order.getPizzaList().toString()),
              () -> assertEquals(5, order.getPizzaList().stream().map(PizzaEntity::getPizzaIngredients).flatMap(Collection::stream).toList().size())
      );
   }
}