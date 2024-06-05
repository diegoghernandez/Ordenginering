package com.backend.pizzaorder.web.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "pizza-ingredient", url = "http://localhost:2222/ingredient")
public interface IngredientClient {

   @GetMapping(value = "/name/{name}")
   Integer getIdByIngredientName(@PathVariable String name);

   @GetMapping(value = "/id/{id}")
   String getIngredientNameById(@PathVariable int id);
}
