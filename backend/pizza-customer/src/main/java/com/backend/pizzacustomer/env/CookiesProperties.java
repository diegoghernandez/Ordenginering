package com.backend.pizzacustomer.env;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("cookie")
public record CookiesProperties(
      boolean secure,
      String sameSite,
      String domain
) {}
