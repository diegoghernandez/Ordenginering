package com.backend.pizza.domain.service;

import com.backend.pizza.persistence.entity.OrderEntity;

import java.util.List;

public interface OrderService {

   List<OrderEntity> getOrdersByAccount(long id);

   void saveOrder(OrderEntity order);

}
