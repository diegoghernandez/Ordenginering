package com.backend.pizzacustomer.setup.testcontainer;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public interface MysqlTestContainer {

    MySQLContainer<?> databaseContainer = new MySQLContainer<>("mysql:8.2.0")
            .withDatabaseName("pizzadatabase")
            .withUsername("myuser")
            .withPassword("verysecret");

    @BeforeAll
    static void setUp() {
        databaseContainer.start();
    }

    @AfterAll
    static void finish() {
        databaseContainer.stop();
    }
}
