package com.backend.pizzacustomer.web.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "jwt", url = "http://localhost:3000/jwt")
public interface JwtClient {

   @PostMapping("/create/{email}")
   String createJWT(@PathVariable String email);
}
