package com.backend.pizza.domain.service;

import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.web.dto.OrderDto;

import java.util.List;

public interface OrderService {

   List<OrderEntity> getOrdersByAccount(long id);

   void saveOrder(OrderDto order);

}
