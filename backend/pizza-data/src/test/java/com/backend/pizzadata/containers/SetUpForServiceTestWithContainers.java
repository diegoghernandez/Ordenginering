package com.backend.pizzadata.containers;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.backend.pizzadata.domain")
public abstract class SetUpForServiceTestWithContainers extends SetUpForTestWithContainers {
}
