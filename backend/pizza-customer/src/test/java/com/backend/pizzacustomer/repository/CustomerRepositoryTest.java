package com.backend.pizzacustomer.repository;

import com.backend.pizzacustomer.setup.testcontainer.SetUpForTestWithContainers;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class CustomerRepositoryTest extends SetUpForTestWithContainers {

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
   @DisplayName("Should update the name of a specific account with its id in the database")
   void changeName() {
      customerRepository.changeName("New name", 31);

      var customerChange = customerRepository.findById(31L).get();

      assertNotEquals("Customer", customerChange.getCustomerName());
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