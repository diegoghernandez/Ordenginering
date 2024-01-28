package com.backend.pizza.service;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.domain.service.CustomerService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.web.dto.CustomerDto;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.internal.matchers.apachecommons.ReflectionEquals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomerServiceImplTest {

   @Autowired
   private CustomerService customerService;

   @Test
   @DisplayName("Should convert one customerDto to customerEntity to send it to the repository")
   void saveCustomer() {
      Exception exceptionEmail = assertThrows(NotAllowedException.class,
              () -> customerService.saveCustomer(new CustomerDto(
                      "Name",
                      "norepeat@name.com",
                      "1234",
                      "1234",
                      LocalDate.of(2004, 2, 2)
              )));

      Exception exceptionAge = assertThrows(NotAllowedException.class,
              () -> customerService.saveCustomer(new CustomerDto(
                      "Name",
                      "original@name.com",
                      "1234",
                      "1234",
                      LocalDate.of(2010, 1, 26)
              )));

      assertAll(
              () -> assertEquals(exceptionEmail.getMessage(), "Email already used"),
              () -> assertEquals(exceptionAge.getMessage(), "No older enough")
      );
   }

   @Test
   @DisplayName("Should return one customer with the specific id using the repository")
   void getCustomerById() {
      assertAll(
              () -> assertTrue(new ReflectionEquals(
                      customerService.getCustomerById(3213).get()).matches(TestDataUtil.getCustomer())),

              () -> assertTrue(customerService.getCustomerById(423432).isEmpty())
      );
   }

   @Test
   @DisplayName("Should update the name of a customer using the repository with the specific id")
   void updateName() {
      Exception exceptionId = assertThrows(NotAllowedException.class,
              () -> customerService.updateEmail("original@name.com", TestDataUtil.getDtoToExceptionInUpdateMethods()));

      assertEquals(exceptionId.getMessage(), "Id doesn't exist");
   }

   @Test
   @DisplayName("Should update the password of a customer using the repository with the specific id")
   void updatePassword() {
      Exception exceptionId = assertThrows(NotAllowedException.class,
              () -> customerService.updateEmail("original@name.com", TestDataUtil.getDtoToExceptionInUpdateMethods()));

      assertEquals(exceptionId.getMessage(), "Id doesn't exist");
   }

   @Test
   @DisplayName("Should update the email of a customer using the repository with the specific id")
   void updateEmail() {
      Exception exceptionId = assertThrows(NotAllowedException.class,
              () -> customerService.updateEmail("original@name.com", TestDataUtil.getDtoToExceptionInUpdateMethods()));

      Exception exceptionEmail = assertThrows(NotAllowedException.class,
              () -> customerService.updateEmail("norepeat@name.com", new NecessaryValuesForChangeDto(
                      36, "password"
              )));

      assertAll(
              () -> assertEquals(exceptionId.getMessage(), "Id doesn't exist"),
              () -> assertEquals(exceptionEmail.getMessage(), "Email already used")
      );
   }
}