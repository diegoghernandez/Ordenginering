package com.backend.pizzacustomer.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@Slf4j
@TestConfiguration
public class RabbitTestConfiguration {

   @Bean
   public Queue createUserRegistrationQueue() {
      return new Queue("q.save-customer-role");
   }
}
