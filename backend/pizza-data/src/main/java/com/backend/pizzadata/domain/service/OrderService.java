package com.backend.pizzadata.domain.service;

import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.web.dto.OrderDto;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface OrderService {

   Optional<Page<OrderEntity>> getOrdersByAccount(long id, int page);

   void saveOrder(OrderDto order) throws NotAllowedException;

}
