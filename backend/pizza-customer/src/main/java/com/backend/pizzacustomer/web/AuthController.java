package com.backend.pizzacustomer.web;

import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.web.api.JwtClient;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.backend.pizzacustomer.web.dto.LoginDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/auth")
public class AuthController {

   private final CustomerService customerService;

   private final AuthenticationManager authenticationManager;

   private final JwtClient jwtClient;

   public AuthController(CustomerService customerService, AuthenticationManager authenticationManager, JwtClient jwtClient) {
      this.customerService = customerService;
      this.authenticationManager = authenticationManager;
      this.jwtClient = jwtClient;
   }

   @PostMapping(value = "/register", consumes = {"application/json"})
   public ResponseEntity<String> registerCustomer(@Valid @RequestBody CustomerDto customerDto) throws NotAllowedException {
      if (!customerDto.password().equals(customerDto.matchingPassword())) {
         throw new NotAllowedException("Passwords don't match");
      }

      customerService.saveCustomer(customerDto);

      return new ResponseEntity<>("Account create successfully", HttpStatus.CREATED);
   }

   @PostMapping(value = "/login", consumes = {"application/json"})
   public ResponseEntity<Void> login(@RequestBody @Valid LoginDto loginDto) {
      authenticationManager.authenticate(new
              UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password()));

      var customer =customerService.getCustomerByEmail(loginDto.email());

      String jwt = jwtClient.createJWT(customer.get().getIdCustomer());

      var cookie = ResponseCookie.from("jwt", jwt)
              .httpOnly(true)
              .maxAge(TimeUnit.DAYS.toSeconds(15))
              .path("/")
              /*.secure(true)
              .domain("")*/
              .build().toString();

      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie).build();
   }
}
