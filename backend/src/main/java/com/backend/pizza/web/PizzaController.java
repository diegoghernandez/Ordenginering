package com.backend.pizza.web;

import com.backend.pizza.constants.Size;
import com.backend.pizza.persistence.entity.PizzaEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pizza")
public class PizzaController {

    @GetMapping(value = "/all", produces = {"application/json"})
    public ResponseEntity<List<PizzaEntity>> getAllPizza() {
        var pizzaList = new ArrayList<PizzaEntity>();

        pizzaList.add(PizzaEntity.builder()
                .idPizza(23L)
                .idCustomer(321L)
                .pizzaName("custom")
                .price(3123.32)
                .size(Size.LARGE)
                .build());

        pizzaList.add(PizzaEntity.builder()
                .idPizza(23L)
                .idCustomer(321L)
                .pizzaName("custom")
                .price(3123.32)
                .size(Size.LARGE)
                .build());

        return new ResponseEntity<>(pizzaList, HttpStatus.OK);
    }
}
