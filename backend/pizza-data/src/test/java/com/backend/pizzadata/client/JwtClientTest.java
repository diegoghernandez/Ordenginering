package com.backend.pizzadata.client;

import com.backend.pizzadata.setup.client.SetUpForJwtClient;
import com.backend.pizzadata.web.api.JwtClient;
import com.backend.pizzadata.web.dto.JwtResponseDto;
import feign.FeignException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
class JwtClientTest extends SetUpForJwtClient {

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
                      Optional.of(new JwtResponseDto("email@example.com", List.of("USER")))
              ),
              () -> assertEquals("401 Unauthorized", formatMessage)
      );
   }

}
