package com.backend.pizza.service;

import com.backend.pizza.TestDataUtil;
import com.backend.pizza.domain.service.CustomerService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.CustomerEntity;
import com.backend.pizza.persistence.repository.CustomerRepository;
import com.backend.pizza.web.dto.CustomerDto;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.matchers.apachecommons.ReflectionEquals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CustomerServiceImplTest {

   @Autowired
   private CustomerService customerService;

   @MockBean
   private CustomerRepository customerRepository;

   private final static long ID__TO__REJECT = 34L;
   private final static long ID__TO__ACCEPT = 4532L;

   @Test
   @DisplayName("Should convert one customerDto to customerEntity to send it to the repository")
   void saveCustomer() throws NotAllowedException {
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

      customerService.saveCustomer(new CustomerDto(
              "Name",
              "original@name.com",
              "1234",
              "1234",
              LocalDate.of(1998, 1, 26)
      ));

      assertAll(
              () -> assertEquals(exceptionEmail.getMessage(), "Email already used"),
              () -> assertEquals(exceptionAge.getMessage(), "No older enough"),
              () -> Mockito.verify(customerRepository, Mockito.times(1))
                      .save(Mockito.isA(CustomerEntity.class))
      );
   }

   @Test
   @DisplayName("Should return one customer with the specific id using the repository")
   void getCustomerById() {
      Mockito.when(customerRepository.findById(ID__TO__ACCEPT))
                      .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      assertAll(
              () -> assertTrue(customerService.getCustomerById(423432).isEmpty()),
              () -> assertTrue(new ReflectionEquals(
                      customerService.getCustomerById(ID__TO__ACCEPT).get()).matches(TestDataUtil.getCustomer())),
              () -> Mockito.verify(customerRepository, Mockito.times(1))
                      .findById(ID__TO__ACCEPT)
      );
   }

   @Test
   @DisplayName("Should change the name of a customer using the repository with the specific id")
   void changeName() {
      Mockito.when(customerRepository.existsById(34L)).thenReturn(true);

      var wrongIdMap = customerService.changeName("Wrong", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__REJECT));

      Mockito.when(customerRepository.findById(ID__TO__ACCEPT))
              .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      var wrongPasswordMap = customerService.changeName("Wrong", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__ACCEPT));

      var goodMap = customerService.changeName("Good", TestDataUtil.getGoodNecessaryDtoForChangeMethods());

      assertAll(
              () -> assertEquals(404, wrongIdMap.getKey()),
              () -> assertEquals("Id doesn't exist", wrongIdMap.getValue()),

              () -> assertEquals(400, wrongPasswordMap.getKey()),
              () -> assertEquals("Incorrect password", wrongPasswordMap.getValue()),

              () -> assertEquals(200, goodMap.getKey()),
              () -> assertEquals("Change name correctly", goodMap.getValue()),
              () -> Mockito.verify(customerRepository, Mockito.times(1))
                      .changeName("Good", 4532)
      );
   }

   @Test
   @DisplayName("Should change the password of a customer using the repository with the specific id")
   void changePassword() {
      Mockito.when(customerRepository.existsById(34L)).thenReturn(true);

      var wrongIdMap = customerService.changePassword("1234", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__REJECT));

      Mockito.when(customerRepository.findById(ID__TO__ACCEPT))
              .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      var wrongPasswordMap = customerService.changePassword("1234", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__ACCEPT));

      var goodMap = customerService.changePassword("4321", TestDataUtil.getGoodNecessaryDtoForChangeMethods());

      assertAll(
              () -> assertEquals(404, wrongIdMap.getKey()),
              () -> assertEquals("Id doesn't exist", wrongIdMap.getValue()),

              () -> assertEquals(400, wrongPasswordMap.getKey()),
              () -> assertEquals("Incorrect password", wrongPasswordMap.getValue()),

              () -> assertEquals(200, goodMap.getKey()),
              () -> assertEquals("Change password correctly", goodMap.getValue()),
              () -> Mockito.verify(customerRepository, Mockito.times(1))
                      .changePassword("4321", 4532)
      );
   }

   @Test
   @DisplayName("Should change the email of a customer using the repository with the specific id")
   void changeEmail() {
      Mockito.when(customerRepository.existsById(34L)).thenReturn(true);

      var wrongIdMap = customerService.changeEmail("wrong@email.com", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__REJECT));

      Mockito.when(customerRepository.findById(ID__TO__ACCEPT))
              .thenReturn(Optional.of(TestDataUtil.getCustomer()));

      var wrongPasswordMap = customerService.changeEmail("wrong@email.com", TestDataUtil.getWrongNecessaryDtoForChangeMethods(ID__TO__ACCEPT));

      var goodMap = customerService.changeEmail("good@email.com", TestDataUtil.getGoodNecessaryDtoForChangeMethods());

      assertAll(
              () -> assertEquals(404, wrongIdMap.getKey()),
              () -> assertEquals("Id doesn't exist", wrongIdMap.getValue()),

              () -> assertEquals(400, wrongPasswordMap.getKey()),
              () -> assertEquals("Incorrect password", wrongPasswordMap.getValue()),

              () -> assertEquals(200, goodMap.getKey()),
              () -> assertEquals("Change email correctly", goodMap.getValue()),
              () -> Mockito.verify(customerRepository, Mockito.times(1))
                      .changeEmail("good@email.com", 4532)
      );
   }
}