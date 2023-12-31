package com.backend.pizza.web;

import com.backend.pizza.persistence.entity.CustomerEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {

   @GetMapping("/{id}")
   public ResponseEntity<CustomerEntity> getById(@PathVariable long id) {
      var customer = CustomerEntity.builder()
              .idCustomer(3213L)
              .customerName("Customer")
              .email("random@random.com")
              .password("1234")
              .build();

      if (id == 3213) return new ResponseEntity<>(customer, HttpStatus.OK);
      else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }
}
