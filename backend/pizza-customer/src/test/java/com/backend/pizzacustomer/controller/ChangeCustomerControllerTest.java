package com.backend.pizzacustomer.controller;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.client.mock.JwtClientMock;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.setup.SetUpForJwtClient;
import com.backend.pizzacustomer.web.ChangeCustomerController;
import com.backend.pizzacustomer.web.config.JwtFilter;
import com.backend.pizzacustomer.web.dto.NecessaryValuesForChangeDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.WireMockServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.AbstractMap;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("test")
class ChangeCustomerControllerTest extends SetUpForJwtClient {

   private MockMvc mockMvc;

   @Autowired
   private ChangeCustomerController changeCustomerController;

   @MockBean
   private CustomerService customerService;

   @Autowired
   private JwtFilter jwtFilter;

   @BeforeEach
   public void setUp() {
      this.mockMvc = MockMvcBuilders.standaloneSetup(changeCustomerController)
              .addFilter(jwtFilter)
              .build();
   }

   @Test
   @DisplayName("Should save a new name")
   void changeName() {
      Mockito.when(customerService.changeName("name", TestDataUtil.getDtoToUpdateMethods()))
              .thenReturn(new AbstractMap.SimpleEntry<>(200, "Change name successfully"));

      var objectMapper = new ObjectMapper();

      assertAll(
              () -> mockMvc.perform(MockMvcRequestBuilders.patch("/change/name/name")
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
              () -> mockMvc.perform(MockMvcRequestBuilders.patch("/change/password/123456")
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
              () -> mockMvc.perform(MockMvcRequestBuilders.patch("/change/email/email@random.com")
                              .contentType(MediaType.APPLICATION_JSON)
                              .content(objectMapper.writeValueAsString(TestDataUtil.getDtoToUpdateMethods())))
                      .andExpect(MockMvcResultMatchers.status().isOk())
                      .andExpect(MockMvcResultMatchers.content().string("Change email successfully")),

              () -> Mockito.verify(customerService, Mockito.times(1))
                      .changeEmail(Mockito.eq("email@random.com"), Mockito.isA(NecessaryValuesForChangeDto.class))
      );
   }
}
