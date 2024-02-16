package com.backend.pizza.containers;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.backend.pizza.domain")
public abstract class SetUpForServiceTestWithContainers extends SetUpForTestWithContainers {
}
