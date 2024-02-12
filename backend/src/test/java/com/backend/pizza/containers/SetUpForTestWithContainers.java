package com.backend.pizza.containers;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@Sql(scripts = "/db/pizzaservice_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_CLASS)
public abstract class SetUpForTestWithContainers {

   @Container
   private static final MySQLContainer<?> databaseContainer = new MySQLContainer<>("mysql:8.2.0")
           .withDatabaseName("pizzadatabase")
           .withUsername("myuser")
           .withPassword("verysecret");
}
