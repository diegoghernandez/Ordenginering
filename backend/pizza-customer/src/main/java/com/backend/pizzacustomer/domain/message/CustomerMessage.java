package com.backend.pizzacustomer.domain.message;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CustomerMessage {

   private final RabbitTemplate rabbitTemplate;

   public CustomerMessage(RabbitTemplate rabbitTemplate) {
      this.rabbitTemplate = rabbitTemplate;
   }

   public void sendCustomerRoleMessage(long customerId) {
      rabbitTemplate.convertAndSend("q.save-customer-role", Map.of("customerId", customerId));
   }
}
