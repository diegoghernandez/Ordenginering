package com.backend.pizzacustomer.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@Slf4j
@TestConfiguration
public class RabbitTestConfiguration {

   @Bean
   public Queue createUserRegistrationQueue() {
      return new Queue("q.save-customer-role");
   }

   @Bean
   public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, ObjectMapper objectMapper){
      final var rabbitTemplate = new RabbitTemplate(connectionFactory);
      rabbitTemplate.setMessageConverter(producerJackson2MessageConverter(objectMapper));
      return rabbitTemplate;
   }

   @Bean
   public MessageConverter producerJackson2MessageConverter(ObjectMapper objectMapper){
      return new Jackson2JsonMessageConverter(objectMapper);
   }
}
