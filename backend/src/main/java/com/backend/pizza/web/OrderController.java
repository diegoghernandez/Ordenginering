package com.backend.pizza.web;

import com.backend.pizza.constants.Size;
import com.backend.pizza.domain.service.OrderService;
import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.persistence.entity.PizzaEntity;
import com.backend.pizza.web.dto.OrderDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/order")
public class OrderController {

   private final OrderService orderService;

   @Autowired
   public OrderController(OrderService orderService) {
      this.orderService = orderService;
   }

   @GetMapping(value = "/account/{id}", produces = "application/json")
   public ResponseEntity<List<OrderEntity>> getOrdersByAccount(@PathVariable long id) {
      var orderList = orderService.getOrdersByAccount(id);

      return (id == 34) ?
         new ResponseEntity<>(orderList, HttpStatus.OK) :
         new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @PostMapping(value = "/save", consumes = "application/json")
   public ResponseEntity<String> saveOrder(@Valid @RequestBody OrderDto orderDto) {
      orderService.saveOrder(orderDto);

      return new ResponseEntity<>("Order save correctly", HttpStatus.CREATED);
   }
}
