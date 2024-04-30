package com.backend.pizzacustomer.setup.testcontainer;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.backend.pizzacustomer.domain")
public abstract class SetUpForServiceTestWithContainers extends SetUpForTestWithContainers {
}
