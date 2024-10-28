package com.backend.pizzacustomer.message;

import com.backend.pizzacustomer.domain.message.CustomerMessage;
import com.backend.pizzacustomer.setup.testcontainer.RabbitTestContainer;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.testcontainers.shaded.org.awaitility.Awaitility;

import java.time.Duration;
import java.util.Map;

@Slf4j
@SpringBootTest
@ExtendWith(OutputCaptureExtension.class)
class CustomerMessageTest implements RabbitTestContainer {

   @Autowired
   private CustomerMessage customerMessage;

   @RabbitListener(queues = {"q.pizza_customer.save_customer_role"})
   public void onPaymentEvent(Map<String, Long> customerId) {
      log.info("Customer id: " + customerId);
   }

   @Test
   void sendCustomerRoleMessage(CapturedOutput capturedOutput) {
      customerMessage.sendCustomerRoleMessage(32);

      Awaitility.await().atMost(Duration.ofSeconds(5L))
                      .until(() -> capturedOutput.getOut().contains("Customer id: {customerId=32}"));

      Assertions.assertThat(capturedOutput.getOut()).contains("Customer id: {customerId=32}");
   }
}