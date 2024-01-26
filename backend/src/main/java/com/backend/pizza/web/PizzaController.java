package com.backend.pizza.web;

import com.backend.pizza.constants.Size;
import com.backend.pizza.persistence.entity.PizzaEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/pizza")
public class PizzaController {

    @GetMapping(value = "/account/{id}", produces = "application/json")
    public ResponseEntity<List<PizzaEntity>> getPizzaByAccount(@PathVariable long id) {
        if (id == 432432L) {
            var pizzaList = List.of(
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
            );

            return new ResponseEntity<>(pizzaList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
