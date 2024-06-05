package com.backend.pizzaorder.web.api;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "pizza-customer", url = "http://localhost:8765/customer")
public interface CustomerClient {

   @RequestMapping(method = RequestMethod.HEAD, value = "/exist/{id}")
   Response customerExist(@PathVariable Long id, @RequestHeader("Cookie") ResponseCookie cookie);
}