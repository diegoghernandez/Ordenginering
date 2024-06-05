package com.backend.pizzaorder.setup.containers;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.backend.pizzaorder.domain")
public abstract class SetUpForServiceWithContainers extends SetUpForTestWithContainers {
}
