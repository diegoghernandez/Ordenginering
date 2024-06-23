package com.backend.pizzacustomer;

import com.backend.pizzacustomer.env.CookiesProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
@EnableConfigurationProperties(CookiesProperties.class)
public class PizzaCustomerApplication {

   public static void main(String[] args) {
      SpringApplication.run(PizzaCustomerApplication.class, args);
   }

}
