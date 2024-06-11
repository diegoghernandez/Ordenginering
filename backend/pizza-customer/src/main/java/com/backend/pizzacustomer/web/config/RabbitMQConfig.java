package com.backend.pizzacustomer.web.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

   @Bean
   public Queue createUserRegistrationQueue() {
      return new Queue("q.save-customer-role");
   }
}
