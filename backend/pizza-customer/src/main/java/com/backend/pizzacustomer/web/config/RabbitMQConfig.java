package com.backend.pizzacustomer.web.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public MessageConverter producerJackson2MessageConverter(ObjectMapper objectMapper) {
        return new Jackson2JsonMessageConverter(objectMapper);
    }


    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, ObjectMapper objectMapper) {
        final var rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2MessageConverter(objectMapper));
        return rabbitTemplate;
    }

    @Bean
    public Queue roleQueue() {
        return new Queue("q.pizza_customer.save_customer_role", false);
    }

    @Bean
    public Queue welcomeQueue() {
        return new Queue("q.pizza_customer.welcome_email", false);
    }

    @Bean
    public FanoutExchange saveCustomerExchange() {
        return new FanoutExchange("e.pizza_customer.saved");
    }

    @Bean
    public Declarables fanoutExchangeBinding(FanoutExchange fanoutExchange, Queue roleQueue, Queue welcomeQueue) {
        return new Declarables(
                BindingBuilder.bind(roleQueue).to(fanoutExchange),
                BindingBuilder.bind(welcomeQueue).to(fanoutExchange)
        );

    }
}
