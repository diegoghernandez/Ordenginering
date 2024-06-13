package com.backend.pizzaingredient.web.client;

import com.backend.pizzaingredient.web.dto.JwtResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "pizza-jwt", url = "http://localhost:3000/jwt")
public interface JwtClient {

   @GetMapping(value = "/verify/{token}")
   Optional<JwtResponseDto> validJwt(@PathVariable String token);
}
