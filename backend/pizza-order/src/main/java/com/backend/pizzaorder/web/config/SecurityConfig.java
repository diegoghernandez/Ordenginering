package com.backend.pizzaorder.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

   private final JwtFilter jwtFilter;

   private final CorsConfiguration corsConfiguration;

   public SecurityConfig(JwtFilter jwtFilter, CorsConfiguration corsConfiguration) {
      this.jwtFilter = jwtFilter;
      this.corsConfiguration = corsConfiguration;
   }

   @Bean
   public SecurityFilterChain filterChain(
           HttpSecurity http,
           HandlerMappingIntrospector introspector
   ) throws Exception {
      var mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);
      http
              .csrf(AbstractHttpConfigurer::disable)
              .cors((cors) -> cors.configurationSource(corsConfiguration.corsConfigurationSource()))
              .authorizeHttpRequests((authorize) -> authorize
                      .requestMatchers(mvcMatcherBuilder.pattern("/ingredient")).permitAll()
                      .anyRequest().authenticated()
              )
              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

      return http.build();
   }
}
