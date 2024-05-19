package com.backend.pizzadata.web;

import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.utils.JwtCookie;
import com.backend.pizzadata.web.domain.OrderDomain;
import com.backend.pizzadata.web.dto.OrderDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/order")
public class OrderController {

   private final OrderService orderService;

   public OrderController(OrderService orderService) {
      this.orderService = orderService;
   }

   @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<OrderEntity> getOrdersById(@PathVariable UUID id) {
      return orderService.getOrderById(id)
              .map((order) -> new ResponseEntity<>(order, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @GetMapping(value = "/customer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<Page<OrderDomain>> getOrdersByAccount(@PathVariable long id, @RequestParam int page) {
      var orderPage = orderService.getOrdersByCustomerId(id, page).get();

      if (orderPage.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

      var mappedOrder = orderPage.map((order) -> new OrderDomain(
              order.getIdOrder(),
              order.getOrderTimestamp(),
              order.getPizzaList().size(),
              order.getTotal()
      ));

      return new ResponseEntity<>(mappedOrder, HttpStatus.OK);
   }

   @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> saveOrder(
           @Valid @RequestBody OrderDto orderDto,
           HttpServletRequest request
   ) throws NotAllowedException {
      var cookie = JwtCookie.getJwtCookie(request);

      if (cookie.isEmpty()) return ResponseEntity.status(403).build();

      orderService.saveOrder(orderDto, cookie.get());

      return new ResponseEntity<>("Order save correctly", HttpStatus.CREATED);
   }
}
