package com.backend.pizzacustomer.domain.message;

import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class CustomerMessage {

   private final RabbitTemplate rabbitTemplate;

   public CustomerMessage(RabbitTemplate rabbitTemplate) {
      this.rabbitTemplate = rabbitTemplate;
   }

   public void sendToCustomerSaveExchange(CustomerSaveDto customerSaveDto) {
      rabbitTemplate.convertAndSend("e.pizza_customer.saved", "", customerSaveDto);
   }
}
