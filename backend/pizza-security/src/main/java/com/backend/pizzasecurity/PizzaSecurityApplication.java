package com.backend.pizzasecurity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class PizzaSecurityApplication {

   public static void main(String[] args) {
      SpringApplication.run(PizzaSecurityApplication.class, args);
   }

}
