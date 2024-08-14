package com.backend.pizzaorder.web.client;

import feign.Response;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "pizza-customer", url = "http://${customer.service.domain}/customer")
public interface CustomerClient {

   @RequestMapping(method = RequestMethod.HEAD, value = "/exist/{id}")
   //@Cacheable(cacheNames = "customer_id", key = "#id")
   Response customerExist(@PathVariable Long id, @RequestHeader("Cookie") ResponseCookie cookie);
}