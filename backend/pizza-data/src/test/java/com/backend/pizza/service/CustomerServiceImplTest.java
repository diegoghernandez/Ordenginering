package com.backend.pizza.service;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.containers.SetUpForServiceTestWithContainers;
import com.backend.pizza.domain.service.CustomerService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.CustomerEntity;
import com.backend.pizza.persistence.repository.CustomerRepository;
import com.backend.pizza.web.dto.CustomerDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.matchers.apachecommons.ReflectionEquals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class CustomerServiceImplTest extends SetUpForServiceTestWithContainers {

   @Autowired
   private CustomerService customerService;

   @Autowired
   private CustomerRepository customerRepository;

   private final static long ID__TO__REJECT = 34L;
   private final static long ID__TO__ACCEPT = 4234L;

   @Test
   @DisplayName("Should convert one customerDto to customerEntity to send it to the repository")
   void saveCustomer() throws NotAllowedException {
      Exception exceptionEmail = assertThrows(NotAllowedException.class,
              () -> customerService.saveCustomer(new CustomerDto(
                      "Name",
                      "first@names.com",
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

      customerService.saveCustomer(new CustomerDto(
              "Name",
              "original@name.com",
              "1234",
              "1234",
              LocalDate.of(1998, 1, 26)
      ));

      var customerSaved = customerService.getCustomerById(1).get().toString();

      var customerExpected = CustomerEntity.builder()
              .idCustomer(1L)
              .customerName("Name")
              .email("original@name.com")
              .password("1234")
              .birthDate(LocalDate.of(1998, 1, 26))
              .build().toString();

      assertAll(
              () -> assertEquals(exceptionEmail.getMessage(), "Email already used"),
              () -> assertEquals(exceptionAge.getMessage(), "No older enough"),
              () -> assertEquals(customerExpected, customerSaved)
      );
   }

   @Test
   @DisplayName("Should return one customer with the specific id using the repository")
   void getCustomerById() {
      assertAll(
              () -> assertTrue(customerService.getCustomerById(423432).isEmpty()),
              () -> assertEquals(TestDataUtil.getCustomer().toString(), customerService.getCustomerById(ID__TO__ACCEPT).get().toString())
      );
   }

   @Test
   @DisplayName("Should change the name of a customer using the repository with the specific id")
   void changeName() {
      var wrongIdMap = customerService.changeName("Wrong", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__REJECT));
      var wrongPasswordMap = customerService.changeName("Wrong", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__ACCEPT));
      var goodMap = customerService.changeName("Good", TestDataUtil.getGoodNecessaryDtoForChangeMethods());

      assertAll(
              () -> assertEquals(404, wrongIdMap.getKey()),
              () -> assertEquals("Id doesn't exist", wrongIdMap.getValue()),

              () -> assertEquals(400, wrongPasswordMap.getKey()),
              () -> assertEquals("Incorrect password", wrongPasswordMap.getValue()),

              () -> assertEquals(200, goodMap.getKey()),
              () -> assertEquals("Change name correctly", goodMap.getValue())
      );
   }

   @Test
   @DisplayName("Should change the password of a customer using the repository with the specific id")
   void changePassword() {
      var wrongIdMap = customerService.changePassword("1234", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__REJECT));
      var wrongPasswordMap = customerService.changePassword("1234", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__ACCEPT));
      var goodMap = customerService.changePassword("4321", TestDataUtil.getGoodNecessaryDtoForChangeMethods());

      assertAll(
              () -> assertEquals(404, wrongIdMap.getKey()),
              () -> assertEquals("Id doesn't exist", wrongIdMap.getValue()),

              () -> assertEquals(400, wrongPasswordMap.getKey()),
              () -> assertEquals("Incorrect password", wrongPasswordMap.getValue()),

              () -> assertEquals(200, goodMap.getKey()),
              () -> assertEquals("Change password correctly", goodMap.getValue())
      );
   }

   @Test
   @DisplayName("Should change the email of a customer using the repository with the specific id")
   void changeEmail() {
      var wrongIdMap = customerService.changeEmail("wrong@email.com", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__REJECT));
      var wrongPasswordMap = customerService.changeEmail("wrong@email.com", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__ACCEPT));
      var goodMap = customerService.changeEmail("good@email.com", TestDataUtil.getGoodNecessaryDtoForChangeMethods());

      assertAll(
              () -> assertEquals(404, wrongIdMap.getKey()),
              () -> assertEquals("Id doesn't exist", wrongIdMap.getValue()),

              () -> assertEquals(400, wrongPasswordMap.getKey()),
              () -> assertEquals("Incorrect password", wrongPasswordMap.getValue()),

              () -> assertEquals(200, goodMap.getKey()),
              () -> assertEquals("Change email correctly", goodMap.getValue())
      );
   }
}