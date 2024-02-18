package com.backend.pizzacustomer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
public class TestPizzaCustomerApplication {

   public static void main(String[] args) {
      SpringApplication.from(PizzaCustomerApplication::main).with(TestPizzaCustomerApplication.class).run(args);
   }

}
