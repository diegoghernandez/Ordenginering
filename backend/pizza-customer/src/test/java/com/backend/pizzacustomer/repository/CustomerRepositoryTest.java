package com.backend.pizzacustomer.repository;

import com.backend.pizzacustomer.containers.SetUpForTestWithContainers;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

@DataJpaTest
class CustomerRepositoryTest extends SetUpForTestWithContainers {

   @Autowired
   private CustomerRepository customerRepository;

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