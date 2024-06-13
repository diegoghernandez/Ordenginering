package com.backend.pizzaingredient.client;

import com.backend.pizzaingredient.setup.client.JwtClientWireMock;
import com.backend.pizzaingredient.web.client.JwtClient;
import com.backend.pizzaingredient.web.dto.JwtResponseDto;
import feign.FeignException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class JwtClientTest implements JwtClientWireMock {

   @Autowired
   private JwtClient jwtClient;

   @Test
   @DisplayName("Should validate a token if is valid return a JwtResponseDto, otherwise return an unauthorized")
   void validJwt() {
      var exception = assertThrows(FeignException.class, () -> jwtClient.validJwt("invalid"));
      var arrayMessage = exception.getMessage().split("] ");
      var formatMessage = arrayMessage[0].replaceAll("[^a-zA-Z0-9 ]","");

      assertAll(
              () -> assertEquals(
                      jwtClient.validJwt("token"),
                      Optional.of(new JwtResponseDto(423, "USER"))
              ),
              () -> assertEquals("401 Unauthorized", formatMessage)
      );
   }

}
