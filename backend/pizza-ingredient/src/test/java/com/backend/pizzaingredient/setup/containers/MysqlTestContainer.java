package com.backend.pizzaingredient.setup.containers;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public interface MysqlTestContainer {

   MySQLContainer<?> databaseContainer = new MySQLContainer<>("mysql:8.2.0")
           .withDatabaseName("pizzadatabase")
           .withUsername("myuser")
           .withPassword("verysecret");

   @DynamicPropertySource
   static void configureProperties(DynamicPropertyRegistry registry) {
      registry.add("spring.datasource.url", databaseContainer::getJdbcUrl);
      registry.add("spring.datasource.username", databaseContainer::getUsername);
      registry.add("spring.datasource.password", databaseContainer::getPassword);
      registry.add("spring.sql.init.platform", () -> "mysql");
      registry.add("spring.datasource.driver-class-name", () -> "com.mysql.cj.jdbc.Driver");
      registry.add("spring.jpa.database", () -> "mysql");
      registry.add("spring.jpa.hibernate.ddl-auto", () -> "create");
      registry.add("spring.jpa.properties.hibernate.dialect", () -> "");
   }

   @BeforeAll
   static void setUp() {
      databaseContainer.start();
   }
}
