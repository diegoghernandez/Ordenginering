package com.backend.pizzaorder.domain.service;

import com.backend.pizzaorder.exceptions.NotAllowedException;
import com.backend.pizzaorder.persistence.entity.OrderEntity;
import com.backend.pizzaorder.web.dto.OrderDto;
import jakarta.servlet.http.Cookie;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface OrderService {

   Optional<Page<OrderEntity>> getOrdersByCustomerId(long id, int page);

   void saveOrder(OrderDto order, Cookie cookie) throws NotAllowedException;

}
