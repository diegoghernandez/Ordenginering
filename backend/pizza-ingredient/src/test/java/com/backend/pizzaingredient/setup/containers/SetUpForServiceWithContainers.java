package com.backend.pizzaingredient.setup.containers;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.backend.pizzaingredient.domain")
public abstract class SetUpForServiceWithContainers extends SetUpForTestWithContainers {
}
