package com.backend.pizza.web;

import com.backend.pizza.constants.Size;
import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.persistence.entity.PizzaEntity;
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

   @PostMapping("/save")
   public ResponseEntity<Void> saveOrder() {
      return new ResponseEntity<>(HttpStatus.CREATED);
   }

   @GetMapping(value = "/account/{id}", produces = "application/json")
   public ResponseEntity<List<OrderEntity>> getOrdersByAccount(@PathVariable long id) {
      var orderList = List.of(
              OrderEntity.builder()
                      .idOrder(UUID.fromString("7ff6dd1d-40c3-4e3b-be84-a6795afc15c6"))
                      .idCustomer(4234L)
                      .country("México")
                      .city("City")
                      .street("Street")
                      .orderTimestamp(LocalDateTime.of(2024, 2, 2, 15, 43, 54))
                      .pizzaList(Arrays.asList(
                              PizzaEntity.builder()
                                      .idPizza(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                                      .idOrder(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                                      .pizzaName("custom")
                                      .price(3123.32)
                                      .size(Size.LARGE)
                                      .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                                      .build(),

                              PizzaEntity.builder()
                                      .idPizza(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                                      .idOrder(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                                      .pizzaName("custom")
                                      .price(3123.32)
                                      .size(Size.LARGE)
                                      .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                                      .build()
                      ))
                      .build(),

              OrderEntity.builder()
                      .idOrder(UUID.fromString("bf8faf9e-02b8-479a-879c-8d7f228222d0"))
                      .idCustomer(4234L)
                      .country("México")
                      .city("City")
                      .street("Street")
                      .houseNumber(342)
                      .floor(34)
                      .orderTimestamp(LocalDateTime.of(2024, 2, 2, 15, 43, 54))
                      .pizzaList(Collections.singletonList(
                              PizzaEntity.builder()
                                      .idPizza(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                                      .idOrder(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                                      .pizzaName("custom")
                                      .price(3123.32)
                                      .size(Size.LARGE)
                                      .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                                      .build()
                      ))
                      .build()
      );

      if (id == 34) {
         return new ResponseEntity<>(orderList, HttpStatus.OK);
      }

      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }
}
