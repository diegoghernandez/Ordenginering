package com.backend.pizzacustomer.controller;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.advice.PizzaCustomerExceptionHandler;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.setup.SetUpForJwtClient;
import com.backend.pizzacustomer.web.CustomerController;
import com.backend.pizzacustomer.web.config.JwtFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("test")
class CustomerControllerTest implements SetUpForJwtClient {

   private MockMvc mockMvc;

   @Autowired
   private CustomerController customerController;

   @MockBean
   private CustomerService customerService;

   @Autowired
   private JwtFilter jwtFilter;

   @BeforeEach
   public void setUp() {
      ObjectMapper objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      this.mockMvc = MockMvcBuilders.standaloneSetup(customerController)
              .setControllerAdvice(new PizzaCustomerExceptionHandler())
              .addFilter(jwtFilter)
              .setMessageConverters(new MappingJackson2HttpMessageConverter(objectMapper))
              .build();
   }

   @Test
   @DisplayName("Should return one customer in json format with a specific id using the service or return a not found")
   void getCustomerById() {
      Mockito.when(customerService.getCustomerById(3213))
              .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      var customerDomain = new CustomerController.CustomerDomain(
              TestDataUtil.getCustomer().getCustomerName(),
              TestDataUtil.getCustomer().getEmail(),
              TestDataUtil.getCustomer().getBirthDate()
      );

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/54345216")
                              .contentType(MediaType.APPLICATION_JSON)
                              .cookie(TestDataUtil.getCookie()))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/3213")
                              .contentType(MediaType.APPLICATION_JSON)
                              .cookie(TestDataUtil.getCookie()))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(customerDomain)))
      );
   }

   @Test
   @DisplayName("Should check if the customer exist under an id and return the status")
   void existCustomerById(){
      Mockito.when(customerService.getCustomerById(3213))
              .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.head("/exist/54345216")
                              .cookie(TestDataUtil.getCookie()))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> mockMvc.perform(MockMvcRequestBuilders.head("/exist/3213")
                              .cookie(TestDataUtil.getCookie()))
                      .andExpect(MockMvcResultMatchers.status().isOk())
      );
   }
}