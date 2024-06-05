package com.backend.pizzaorder.setup.client;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@EnableFeignClients
public abstract class SetUpForClient {

   @DynamicPropertySource
   static void configureProperties(DynamicPropertyRegistry registry) {
      registry.add("spring.jpa.defer-datasource-initialization", () -> false);
      registry.add("spring.sql.init.mode", () -> "never");
   }
}
