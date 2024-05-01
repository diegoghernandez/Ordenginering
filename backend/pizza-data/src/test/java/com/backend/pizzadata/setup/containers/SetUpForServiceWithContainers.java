package com.backend.pizzadata.setup.containers;

import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.backend.pizzadata.domain")
public abstract class SetUpForServiceWithContainers extends SetUpForTestWithContainers {
}
