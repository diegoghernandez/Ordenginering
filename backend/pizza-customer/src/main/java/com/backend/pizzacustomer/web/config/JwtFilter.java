package com.backend.pizzacustomer.web.config;

import com.backend.pizzacustomer.web.api.JwtClient;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

   private final JwtClient jwtClient;

   public JwtFilter(JwtClient jwtClient) {
      this.jwtClient = jwtClient;
   }

   @Override
   protected void doFilterInternal(
           HttpServletRequest request,
           HttpServletResponse response,
           FilterChain filterChain
   ) throws ServletException, IOException {
      var token = Optional.ofNullable(WebUtils.getCookie(request, "jwt"));

      if (token.isEmpty()) {
         filterChain.doFilter(request, response);
         return;
      }

      var jwt = jwtClient.validJwt(token.get().getValue());

      if (jwt.isEmpty()) {
         filterChain.doFilter(request, response);
         return;
      }

      String username = jwt.get().subject();

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
              username,
              "",
              List.of()
      );

      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      filterChain.doFilter(request, response);
   }
}
