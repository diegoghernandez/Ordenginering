package com.backend.pizzadata.web.api;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "customer", url = "http://localhost:8765/customer")
public interface CustomerClient {

   @RequestMapping(method = RequestMethod.HEAD, value = "/{id}")
   Response customerExist(@PathVariable Long id);
}