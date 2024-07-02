package com.backend.pizzacustomer.web.config;

import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

@Component
public class CustomerIdAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

   @Override
   public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext object) {
      var principal = authentication.get().getPrincipal().toString();
      var request = object.getRequest().getRequestURI();

      return new AuthorizationDecision(principal.equals(request.split("/")[request.split("/").length - 1]));
   }
}
