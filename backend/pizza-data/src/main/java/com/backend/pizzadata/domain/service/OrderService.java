package com.backend.pizzadata.domain.service;

import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.web.dto.OrderDto;
import jakarta.servlet.http.Cookie;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface OrderService {

   Optional<OrderEntity> getOrderById(UUID orderId);

   Optional<Page<OrderEntity>> getOrdersByCustomerId(long id, int page);

   void saveOrder(OrderDto order, Cookie cookie) throws NotAllowedException;

}
