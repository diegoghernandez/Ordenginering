package com.backend.pizzacustomer.message;

import com.backend.pizzacustomer.domain.dto.CustomerSaveDto;
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
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertAll;

@Slf4j
@SpringBootTest
@ExtendWith(OutputCaptureExtension.class)
class CustomerMessageTest implements RabbitTestContainer {

    @Autowired
    private CustomerMessage customerMessage;

    @RabbitListener(queues = "q.pizza_customer.save_customer_role")
    public void onPaymentEvent(CustomerSaveDto customerSaveDto) {
        log.info("Customer id: " + customerSaveDto.getCustomerId());
        log.info("Customer email: " + customerSaveDto.getEmail());
        log.info("Token: " + customerSaveDto.getToken());
        log.info("Locale: " + customerSaveDto.getLocale());
    }

    @Test
    void sendToCustomerSaveExchange(CapturedOutput capturedOutput) {
        var uuid = UUID.randomUUID();
        customerMessage.sendToCustomerSaveExchange(new CustomerSaveDto(
                32,
                "email@email.com",
                uuid,
                "en"));

        Awaitility.await().atMost(Duration.ofSeconds(5L))
                .until(() -> capturedOutput.getOut().contains("Customer id: 32"));

        assertAll(
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Customer id: 32"),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Customer email: email@email.com"),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Token: " + uuid),
                () -> Assertions.assertThat(capturedOutput.getOut()).contains("Locale: en")
        );
    }
}