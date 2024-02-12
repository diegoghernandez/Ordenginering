package com.backend.pizza.web;

import com.backend.pizza.domain.service.OrderService;
import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.web.dto.OrderDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

   private final OrderService orderService;

   @Autowired
   public OrderController(OrderService orderService) {
      this.orderService = orderService;
   }

   @GetMapping(value = "/account/{id}", produces = "application/json")
   public ResponseEntity<Page<OrderEntity>> getOrdersByAccount(@PathVariable long id, @RequestParam int page) {
      return orderService.getOrdersByAccount(id, page)
              .map(orderEntities -> new ResponseEntity<>(orderEntities, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @PostMapping(value = "/save", consumes = "application/json")
   public ResponseEntity<String> saveOrder(@Valid @RequestBody OrderDto orderDto) {
      orderService.saveOrder(orderDto);

      return new ResponseEntity<>("Order save correctly", HttpStatus.CREATED);
   }
}
