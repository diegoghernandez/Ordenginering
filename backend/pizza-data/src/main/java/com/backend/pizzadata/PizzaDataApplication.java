package com.backend.pizzadata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class PizzaDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzaDataApplication.class, args);
	}

}
