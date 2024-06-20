package com.backend.pizzaorder.web.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "pizza-ingredient", url = "http://${ingredient.service.domain}/ingredient")
public interface IngredientClient {

   @GetMapping(value = "/name/{name}")
   Integer getIdByIngredientName(@PathVariable String name, @RequestHeader("Cookie") ResponseCookie cookie);

   @GetMapping(value = "/id/{id}")
   String getIngredientNameById(@PathVariable int id, @RequestHeader("Cookie") ResponseCookie cookie);
}
