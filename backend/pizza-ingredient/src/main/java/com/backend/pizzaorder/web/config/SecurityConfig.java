package com.backend.pizzaorder.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {
   @Bean
   public SecurityFilterChain filterChain(
           HttpSecurity http,
           HandlerMappingIntrospector introspector
   ) throws Exception {
      var mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

      http
              .csrf(AbstractHttpConfigurer::disable)
              .authorizeHttpRequests((authorize) -> authorize
                      .requestMatchers(mvcMatcherBuilder.pattern("/**")).permitAll()
                      .anyRequest().authenticated()
              );

      return http.build();
   }
}
