package com.backend.pizzaorder.client;

import com.backend.pizzaorder.TestDataUtil;
import com.backend.pizzaorder.setup.client.CustomerClientWireMock;
import com.backend.pizzaorder.web.client.CustomerClient;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseCookie;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class CustomerClientTest implements CustomerClientWireMock {

   @Autowired
   private CustomerClient customerClient;

   @Test
   @DisplayName("Should validate a token if is valid return a JwtResponseDto, otherwise return an unauthorized")
   void validJwt() {
      var cookie = ResponseCookie.from(TestDataUtil.getCookie().getName(), TestDataUtil.getCookie().getValue()).build();

      assertAll(
              () -> assertEquals(customerClient.customerExist(2L, cookie).status(), 200),
              () -> assertEquals(customerClient.customerExist(8789L, cookie).status(), 404)
      );
   }
}
