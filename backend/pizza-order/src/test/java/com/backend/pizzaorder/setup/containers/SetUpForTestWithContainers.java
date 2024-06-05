package com.backend.pizzaorder.setup.containers;

import org.junit.jupiter.api.BeforeAll;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public abstract class SetUpForTestWithContainers {

   private static final MySQLContainer<?> databaseContainer = new MySQLContainer<>("mysql:8.2.0")
           .withDatabaseName("pizzadatabase")
           .withUsername("myuser")
           .withPassword("verysecret");

   @BeforeAll
   static void setUp() {
      databaseContainer.start();
   }
}
