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

@RestController
@RequestMapping("/pizza")
public class PizzaController {

    @GetMapping(value = "/account/{id}", produces = {"application/json"})
    public ResponseEntity<List<PizzaEntity>> getPizzaByAccount(@PathVariable long id) {
        if (id == 432432L) {
            var pizzaList = new ArrayList<PizzaEntity>();

            pizzaList.add(PizzaEntity.builder()
                    .idPizza(23L)
                    .idCustomer(321L)
                    .pizzaName("custom")
                    .price(3123.32)
                    .size(Size.LARGE)
                    .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                    .build());

            pizzaList.add(PizzaEntity.builder()
                    .idPizza(23L)
                    .idCustomer(321L)
                    .pizzaName("custom")
                    .price(3123.32)
                    .size(Size.LARGE)
                    .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                    .build());

            return new ResponseEntity<>(pizzaList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
