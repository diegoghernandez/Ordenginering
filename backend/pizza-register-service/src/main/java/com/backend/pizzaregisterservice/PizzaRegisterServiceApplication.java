package com.backend.pizzaregisterservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class PizzaRegisterServiceApplication {

   public static void main(String[] args) {
      SpringApplication.run(PizzaRegisterServiceApplication.class, args);
   }

}
