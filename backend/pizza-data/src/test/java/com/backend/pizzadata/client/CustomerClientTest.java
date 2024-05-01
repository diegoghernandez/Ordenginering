package com.backend.pizzadata.client;

import com.backend.pizzadata.TestDataUtil;
import com.backend.pizzadata.setup.client.SetUpForCustomerClient;
import com.backend.pizzadata.web.api.CustomerClient;
import com.backend.pizzadata.web.dto.JwtResponseDto;
import feign.FeignException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseCookie;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class CustomerClientTest extends SetUpForCustomerClient {

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
