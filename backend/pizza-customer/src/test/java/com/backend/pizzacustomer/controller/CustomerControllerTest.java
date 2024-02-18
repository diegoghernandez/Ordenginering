package com.backend.pizzacustomer.controller;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.web.CustomerController;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.backend.pizzacustomer.web.dto.NecessaryValuesForChangeDto;
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
import java.util.AbstractMap;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;

@WebMvcTest(CustomerController.class)
class CustomerControllerTest {

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
              () -> mockMvc.perform(MockMvcRequestBuilders.post("/customer/register")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(passwordErrorCustomer)))
                      .andExpect(MockMvcResultMatchers.status().isBadRequest())
                      .andExpect(MockMvcResultMatchers.content().string("Passwords don't match")),

              () -> mockMvc.perform(MockMvcRequestBuilders.post("/customer/register")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(successCustomer)))
                      .andExpect(MockMvcResultMatchers.status().isCreated())
                      .andExpect(MockMvcResultMatchers.content().string("Account create successfully"))

      );
   }

   @Test
   @DisplayName("Should return one customer in json format with a specific id using the service or return a not found")
   void getCustomerById() {
      Mockito.when(customerService.getCustomerById(3213))
              .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      var objectMapper = new ObjectMapper();
      objectMapper.registerModule(new JavaTimeModule());
      objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.get("/customer/54345216")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isNotFound()),

              () -> mockMvc.perform(MockMvcRequestBuilders.get("/customer/3213")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(TestDataUtil.getCustomer())))
      );
   }

   @Test
   @DisplayName("Should save a new name")
   void changeName() {
      Mockito.when(customerService.changeName("name", TestDataUtil.getDtoToUpdateMethods()))
              .thenReturn(new AbstractMap.SimpleEntry<>(200, "Change name successfully"));

      var objectMapper = new ObjectMapper();

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.patch("/customer/change-name/name")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(TestDataUtil.getDtoToUpdateMethods())))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("Change name successfully")),

              () -> Mockito.verify(customerService, Mockito.times(1))
                      .changeName(Mockito.eq("name"), Mockito.isA(NecessaryValuesForChangeDto.class))
      );
   }

   @Test
   @DisplayName("Should save a new password")
   void changePassword() {
      Mockito.when(customerService.changePassword("123456", TestDataUtil.getDtoToUpdateMethods()))
              .thenReturn(new AbstractMap.SimpleEntry<>(200, "Change password successfully"));

      var objectMapper = new ObjectMapper();

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.patch("/customer/change-password/123456")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(TestDataUtil.getDtoToUpdateMethods())))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("Change password successfully")),

              () -> Mockito.verify(customerService, Mockito.times(1))
                      .changePassword(Mockito.eq("123456"), Mockito.isA(NecessaryValuesForChangeDto.class))
      );
   }

   @Test
   @DisplayName("Should save a new email")
   void changeEmail() {
      Mockito.when(customerService.changeEmail("email@random.com", TestDataUtil.getDtoToUpdateMethods()))
              .thenReturn(new AbstractMap.SimpleEntry<>(200, "Change email successfully"));

      var objectMapper = new ObjectMapper();

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.patch("/customer/change-email/email@random.com")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(TestDataUtil.getDtoToUpdateMethods())))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("Change email successfully")),

              () -> Mockito.verify(customerService, Mockito.times(1))
                      .changeEmail(Mockito.eq("email@random.com"), Mockito.isA(NecessaryValuesForChangeDto.class))
      );
   }
}