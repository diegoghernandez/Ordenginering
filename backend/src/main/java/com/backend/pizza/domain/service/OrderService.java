package com.backend.pizza.domain.service;

import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.web.dto.OrderDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {

   Optional<Page<OrderEntity>> getOrdersByAccount(long id, int page);

   void saveOrder(OrderDto order);

}
