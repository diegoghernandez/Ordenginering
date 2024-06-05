package com.backend.pizzaorder.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.util.WebUtils;

import java.util.Optional;

public final class JwtCookie {
   public static Optional<Cookie> getJwtCookie(HttpServletRequest request) {
      return Optional.ofNullable(WebUtils.getCookie(request, "jwt"));
   }
}
