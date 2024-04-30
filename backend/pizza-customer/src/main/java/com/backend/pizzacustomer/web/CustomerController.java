package com.backend.pizzacustomer.web;

import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.persistence.entity.CustomerEntity;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class CustomerController {

   private final CustomerService customerService;

   public CustomerController(CustomerService customerService) {
      this.customerService = customerService;
   }

   @GetMapping(value = "/{id}", produces = {"application/json;charset=UTF-8"})
   public ResponseEntity<CustomerEntity> getCustomerById(@PathVariable long id) {
      return customerService.getCustomerById(id)
              .map((customer) -> new ResponseEntity<>(customer, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @RequestMapping(value = "/exist/{id}", method = RequestMethod.HEAD)
   public ResponseEntity<Void> existCustomerById(@PathVariable long id) {
      return customerService.getCustomerById(id)
              .map((customer) -> new ResponseEntity<Void>(HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

}
