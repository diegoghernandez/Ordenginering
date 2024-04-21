package com.backend.pizzacustomer.controller;

import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.web.AuthController;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertAll;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private CustomerService customerService;

   @Test
   @DisplayName("Should register a customer correctly")
   void registerCustomer() {
      var passwordErrorCustomer = new CustomerDto(
              "Name",
              "norepeat@name.com",
              "1234",
              "43252543",
              LocalDate.of(2004, 2, 2)
      );

      var successCustomer = new CustomerDto(
              "Name",
              "norepeat@name.com",
              "1234",
              "1234",
              LocalDate.of(2004, 2, 2)
      );

      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.post("/register")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(passwordErrorCustomer)))
                      .andExpect(MockMvcResultMatchers.status().isBadRequest())
                      .andExpect(MockMvcResultMatchers.content().string("{\"desc\":\"Passwords don't match\",\"fieldError\":null}")),

              () -> Mockito.verify(customerService, Mockito.times(0))
                      .saveCustomer(Mockito.eq(successCustomer)),

              () -> mockMvc.perform(MockMvcRequestBuilders.post("/register")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(successCustomer)))
                      .andExpect(MockMvcResultMatchers.status().isCreated())
                      .andExpect(MockMvcResultMatchers.content().string("Account create successfully")),

              () -> Mockito.verify(customerService, Mockito.times(1))
                      .saveCustomer(Mockito.eq(successCustomer))

      );
   }
}
