package com.backend.pizzacustomer.setup.testcontainer;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.RabbitMQContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public interface RabbitTestContainer {

   RabbitMQContainer rabbitContainer = new RabbitMQContainer("rabbitmq:3.13-management");

   @DynamicPropertySource
   static void registerProperties(DynamicPropertyRegistry registry) {
      registry.add("spring.rabbitmq.host", rabbitContainer::getHost);
      registry.add("spring.rabbitmq.port", rabbitContainer::getAmqpPort);
      registry.add("spring.rabbitmq.username", rabbitContainer::getAdminUsername);
      registry.add("spring.rabbitmq.password", rabbitContainer::getAdminPassword);
   }

   @BeforeAll
   static void setUp() {
      rabbitContainer.start();
   }

   @AfterAll
   static void finish() {
      rabbitContainer.stop();
   }
}
