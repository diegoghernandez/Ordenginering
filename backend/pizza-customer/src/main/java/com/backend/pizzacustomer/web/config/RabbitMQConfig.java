package com.backend.pizzacustomer.web.config;

import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public MessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }


    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final var rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
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
    public Declarables saveCustomerExchangeBinding(
            FanoutExchange saveCustomerExchange, Queue roleQueue, Queue welcomeQueue) {
        return new Declarables(
                BindingBuilder.bind(roleQueue).to(saveCustomerExchange),
                BindingBuilder.bind(welcomeQueue).to(saveCustomerExchange)
        );

    }

    @Bean
    public Queue resetPasswordEmailQueue() {
        return new Queue("q.pizza_customer.reset_password_email", false);
    }

    @Bean
    public FanoutExchange resetPasswordExchange() {
        return new FanoutExchange("e.pizza_customer.reset_password");
    }

    @Bean
    public Declarables resetPasswordExchangeBinding(
            FanoutExchange resetPasswordExchange, Queue resetPasswordEmailQueue) {
        return new Declarables(
                BindingBuilder.bind(resetPasswordEmailQueue).to(resetPasswordExchange)
        );

    }
}
