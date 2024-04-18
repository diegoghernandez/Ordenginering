package com.backend.pizzadata.web;

import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.web.dto.OrderDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:4321")
public class OrderController {

   private final OrderService orderService;

   public OrderController(OrderService orderService) {
      this.orderService = orderService;
   }

   @GetMapping(value = "/account/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<Page<OrderEntity>> getOrdersByAccount(@PathVariable long id, @RequestParam int page) {
      var orderPage = orderService.getOrdersByAccount(id, page).get();

      return orderPage.isEmpty() ?
              new ResponseEntity<>(HttpStatus.NOT_FOUND) :
              new ResponseEntity<>(orderPage, HttpStatus.OK);
   }

   @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> saveOrder(@Valid @RequestBody OrderDto orderDto) throws NotAllowedException {
      orderService.saveOrder(orderDto);

      return new ResponseEntity<>("Order save correctly", HttpStatus.CREATED);
   }
}
