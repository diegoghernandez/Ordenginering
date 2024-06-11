package com.backend.pizzacustomer.repository;

import com.backend.pizzacustomer.setup.testcontainer.MysqlTestContainer;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.Month;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class CustomerRepositoryTest implements MysqlTestContainer {

   @Autowired
   private CustomerRepository customerRepository;

   @Test
   @DisplayName("Should get a customer by email if exist")
   void findByEmail() {
      var notExistingCustomer = customerRepository.findByEmail("wrong@names.com");
      var existingCustomer = customerRepository.findByEmail("second@names.com");

      assertAll(
              () -> assertFalse(notExistingCustomer.isPresent()),
              () -> assertTrue(existingCustomer.isPresent())
      );
   }

   @Test
   @DisplayName("Should get a boolean according to existence of the customer")
   void existByEmail() {
      var notExistingCustomer = customerRepository.existsByEmail("wrong@names.com");
      var existingCustomer = customerRepository.existsByEmail("second@names.com");

      assertAll(
              () -> assertFalse(notExistingCustomer),
              () -> assertTrue(existingCustomer)
      );
   }

   @Test
   @DisplayName("Should update the name and/or birthDate of a specific account with its id in the database")
   void changeProfile() {
      customerRepository.changeProfile("New name", LocalDate.of(1990, Month.AUGUST, 2), 31L);

      var customerChangeNew = customerRepository.findById(31L).get();

      assertAll(
              () -> assertNotEquals("Customer", customerChangeNew.getCustomerName()),
              () -> assertNotEquals(LocalDate.of(2003, Month.OCTOBER, 9), customerChangeNew.getBirthDate())
      );
   }

   @Test
   @DisplayName("Should update the password of a specific account with its id in the database")
   void changePassword() {
      customerRepository.changePassword("6435674356", 31);

      var customerChange = customerRepository.findById(31L).get();

      assertNotEquals("31234", customerChange.getPassword());
   }

   @Test
   @DisplayName("Should update the email of a specific account with its id in the database")
   void changeEmail() {
      customerRepository.changeEmail("new@names.com", 31);

      var customerChange = customerRepository.findById(31L).get();

      assertNotEquals("random@names.com", customerChange.getEmail());
   }
}