package com.backend.pizzacustomer.web;

import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.env.CookiesProperties;
import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.web.client.JwtClient;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.backend.pizzacustomer.web.dto.LoginDto;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/auth")
public class AuthController {

   private final CustomerService customerService;

   private final AuthenticationManager authenticationManager;

   private final JwtClient jwtClient;

   private final CookiesProperties cookiesProperties;

   public AuthController(CustomerService customerService, AuthenticationManager authenticationManager, JwtClient jwtClient, CookiesProperties cookiesProperties) {
      this.customerService = customerService;
      this.authenticationManager = authenticationManager;
      this.jwtClient = jwtClient;
      this.cookiesProperties = cookiesProperties;
   }

   @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> registerCustomer(@Valid @RequestBody CustomerDto customerDto) throws NotAllowedException {
      if (!customerDto.password().equals(customerDto.matchingPassword())) {
         throw new NotAllowedException("Passwords don't match");
      }

      customerService.saveCustomer(customerDto);

      return new ResponseEntity<>("Account create successfully", HttpStatus.CREATED);
   }

   @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<Long> login(@RequestBody @Valid LoginDto loginDto) {
      authenticationManager.authenticate(new
              UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password()));

      var customer =customerService.getCustomerByEmail(loginDto.email());

      String jwt = jwtClient.createJWT(customer.get().getIdCustomer());

      var cookie = ResponseCookie.from("jwt", jwt)
              .httpOnly(true)
              .path("/")
              .sameSite(cookiesProperties.sameSite())
              .secure(cookiesProperties.secure())
              .domain(cookiesProperties.domain())
              .maxAge(TimeUnit.DAYS.toSeconds(15))
              .build().toString();

      var header = new HttpHeaders();
      header.set(HttpHeaders.SET_COOKIE, cookie);
      return new ResponseEntity<>(customer.get().getIdCustomer(), header, HttpStatus.OK);
   }

   @RequestMapping(value = "/logout", method = RequestMethod.HEAD)
   public ResponseEntity<Void> logout() {
      var cookie = ResponseCookie.from("jwt", "")
              .httpOnly(true)
              .path("/")
              .sameSite(cookiesProperties.sameSite())
              .secure(cookiesProperties.secure())
              .domain(cookiesProperties.domain())
              .maxAge(0)
              .build().toString();

      var header = new HttpHeaders();
      header.set(HttpHeaders.SET_COOKIE, cookie);
      return new ResponseEntity<>(header, HttpStatus.OK);
   }
}
