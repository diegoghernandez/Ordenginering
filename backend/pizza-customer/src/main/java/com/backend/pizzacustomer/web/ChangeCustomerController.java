package com.backend.pizzacustomer.web;

import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.web.dto.NecessaryValuesForChangeDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/change")
public class ChangeCustomerController {
   private final CustomerService customerService;

   public ChangeCustomerController(CustomerService customerService) {
      this.customerService = customerService;
   }

   @PatchMapping(value = "/name/{name}", consumes = {"application/json"})
   public ResponseEntity<String> changeName(
           @NotBlank @PathVariable String name,
           @Valid @RequestBody NecessaryValuesForChangeDto forChangeDto
   ) {
      var result = customerService.changeName(name, forChangeDto);

      return new ResponseEntity<>(result.getValue(), HttpStatus.valueOf(result.getKey()));
   }

   @PatchMapping(value = "/password/{password}", consumes = {"application/json"})
   public ResponseEntity<String> changePassword(
           @NotBlank @PathVariable String password,
           @Valid @RequestBody NecessaryValuesForChangeDto forChangeDto
   ) {
      var result = customerService.changePassword(password, forChangeDto);

      return new ResponseEntity<>(result.getValue(), HttpStatus.valueOf(result.getKey()));
   }

   @PatchMapping(value = "/email/{email}", consumes = {"application/json"})
   public ResponseEntity<String> changeEmail(
           @NotBlank @PathVariable String email,
           @Valid @RequestBody NecessaryValuesForChangeDto forChangeDto
   ) {
      var result = customerService.changeEmail(email, forChangeDto);

      return new ResponseEntity<>(result.getValue(), HttpStatus.valueOf(result.getKey()));
   }
}