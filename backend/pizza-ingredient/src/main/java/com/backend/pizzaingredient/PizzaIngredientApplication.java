package com.backend.pizzaingredient;

import com.backend.pizzaingredient.env.BucketProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableConfigurationProperties(BucketProperties.class)
public class PizzaIngredientApplication {

   public static void main(String[] args) {
      SpringApplication.run(PizzaIngredientApplication.class, args);
   }

}
