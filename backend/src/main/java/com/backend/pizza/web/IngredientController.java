package com.backend.pizza.web;

import com.backend.pizza.persistence.entity.IngredientEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {

   @GetMapping(value = "/all", produces = {"application/json"})
   public ResponseEntity<List<IngredientEntity>> getAllPizza() {
      var ingredientList = new ArrayList<IngredientEntity>();

      ingredientList.add(IngredientEntity.builder()
                      .idIngredient(4324L)
                      .ingredientName("Queso")
                      .urlImage("Author")
                      .authorImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
              .build());

      ingredientList.add(IngredientEntity.builder()
                      .idIngredient(65437L)
                      .ingredientName("Pizza")
                      .urlImage("Author")
                      .authorImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
              .build());

      return new ResponseEntity<>(ingredientList, HttpStatus.OK);
   }
}
