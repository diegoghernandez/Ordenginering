package com.backend.pizzacustomer.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Component
public class CorsConfiguration {

   @Bean
   CorsConfigurationSource corsConfigurationSource() {
      var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();

      corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:4321"));
      corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
      corsConfiguration.setAllowedHeaders(List.of("*"));
      corsConfiguration.setAllowCredentials(true);

      var source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", corsConfiguration);

      return source;
   }
}
