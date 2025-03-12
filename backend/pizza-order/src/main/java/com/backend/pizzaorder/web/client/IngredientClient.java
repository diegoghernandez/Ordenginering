package com.backend.pizzaorder.web.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "pizza-ingredient", url = "http://${ingredient.service.domain}/api/ingredient")
public interface IngredientClient {

    @RequestMapping(value = "/id/{id}", method = RequestMethod.HEAD)
        //@Cacheable(cacheNames = "ingredient-exist", key = "#id")
    void existIngredientId(@PathVariable int id, @RequestHeader("Cookie") ResponseCookie cookie);

    @GetMapping(value = "/id/{id}")
        //@Cacheable(cacheNames = "ingredient-name", key = "#id")
    String getIngredientNameById(@PathVariable int id, @RequestHeader("Cookie") ResponseCookie cookie);
}
