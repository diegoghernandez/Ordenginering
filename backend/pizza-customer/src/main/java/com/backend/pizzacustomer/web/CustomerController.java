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
@CrossOrigin(origins = "http://localhost:4321")
public class CustomerController {

   private final CustomerService customerService;

   public CustomerController(CustomerService customerService) {
      this.customerService = customerService;
   }

   @PostMapping(value = "/register", consumes = {"application/json"})
   public ResponseEntity<String> registerCustomer(@Valid @RequestBody CustomerDto customerDto) throws NotAllowedException {
      if (!customerDto.password().equals(customerDto.matchingPassword())) {
         throw new NotAllowedException("Passwords don't match");
      }

      customerService.saveCustomer(customerDto);

      return new ResponseEntity<>("Account create successfully", HttpStatus.CREATED);
   }

   @GetMapping("/{id}")
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
