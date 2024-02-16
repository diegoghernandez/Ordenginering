package com.backend.pizza.containers;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
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
