package com.backend.pizzacustomer.web;

import com.backend.pizzacustomer.domain.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping
public class CustomerController {

   private final CustomerService customerService;

   public CustomerController(CustomerService customerService) {
      this.customerService = customerService;
   }

   @GetMapping(value = "/{id}", produces = {"application/json;charset=UTF-8"})
   public ResponseEntity<CustomerDomain> getCustomerById(@PathVariable long id) {
      return customerService.getCustomerById(id)
              .map((customer) -> new ResponseEntity<>(new CustomerDomain(
                      customer.getCustomerName(),
                      customer.getEmail(),
                      customer.getBirthDate()
              ), HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @RequestMapping(method = RequestMethod.HEAD, value = "/exist/{id}")
   public ResponseEntity<Void> existCustomerById(@PathVariable long id) {
      return customerService.getCustomerById(id)
              .map((customer) -> new ResponseEntity<Void>(HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   public record CustomerDomain(
           String customerName,
           String email,
           LocalDate birthDate
   ){}
}
