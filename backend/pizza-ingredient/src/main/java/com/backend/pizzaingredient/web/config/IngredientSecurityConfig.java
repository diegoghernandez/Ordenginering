package com.backend.pizzaingredient.web.config;

import com.backend.pizzaingredient.constants.IngredientCustomerRoles;
import com.backend.pizzaingredient.web.client.JwtClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.awt.image.BufferedImage;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class IngredientSecurityConfig {

   private final JwtFilter jwtFilter;

   public IngredientSecurityConfig(JwtFilter jwtFilter) {
      this.jwtFilter = jwtFilter;
   }

   @Bean
   public SecurityFilterChain filterChain(
           HttpSecurity http,
           HandlerMappingIntrospector introspector
   ) throws Exception {
      var mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

      http
              .csrf(AbstractHttpConfigurer::disable)
              .authorizeHttpRequests((authorize) -> authorize
                      .requestMatchers(mvcMatcherBuilder.pattern(HttpMethod.POST, "/ingredient"))
                        .hasRole(IngredientCustomerRoles.ADMIN.toString())
                      .requestMatchers(mvcMatcherBuilder.pattern(HttpMethod.GET, "/ingredient"))
                        .hasAnyRole(IngredientCustomerRoles.ADMIN.toString(), IngredientCustomerRoles.CI.toString())
                      .requestMatchers(mvcMatcherBuilder.pattern("/ingredient/**"))
                        .hasAnyRole(IngredientCustomerRoles.ADMIN.toString(), IngredientCustomerRoles.USER.toString())
                      .anyRequest().authenticated()
              )
              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

      return http.build();
   }

   @Bean
   public HttpMessageConverter<BufferedImage> bufferedImageHttpMessageConverter() {
      return new BufferedImageHttpMessageConverter();
   }
}
