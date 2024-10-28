package com.backend.pizzacustomer.domain.message;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomerMessage {

   private final RabbitTemplate rabbitTemplate;

   public CustomerMessage(RabbitTemplate rabbitTemplate) {
      this.rabbitTemplate = rabbitTemplate;
   }

   public void sendCustomerRoleMessage(long customerId) {
      rabbitTemplate.convertAndSend("e.pizza_customer.saved", "", Map.of("customerId", customerId));
   }
}
