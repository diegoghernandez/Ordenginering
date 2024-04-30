package com.backend.pizzacustomer.client;

import com.backend.pizzacustomer.client.mock.JwtClientMock;
import com.backend.pizzacustomer.config.WireMockConfig;
import com.backend.pizzacustomer.setup.SetUpForJwtClient;
import com.backend.pizzacustomer.web.api.JwtClient;
import com.backend.pizzacustomer.web.dto.JwtResponseDto;
import com.github.tomakehurst.wiremock.WireMockServer;
import feign.FeignException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class JwtClientTest extends SetUpForJwtClient {

   @Autowired
   private JwtClient jwtClient;

   /*@Autowired
   private WireMockServer jwtMocksService;*/

   /*@BeforeEach
   public void setUp() {
      JwtClientMock.setupMockJWtResponse();
   }*/

   @Test
   @DisplayName("Should return a token if is valid or return a bad request if not")
   void createJwt() {
      var exception = assertThrows(FeignException.class, () -> jwtClient.createJWT("incorrectFormat.com"));
      var arrayMessage = exception.getMessage().split(":");
      var formatMessage = arrayMessage[arrayMessage.length - 1]
              .replaceFirst(" ", "").replaceAll("[^a-zA-Z0-9 ]","");

      assertAll(
              () -> assertEquals(jwtClient.createJWT("random@example.com"), "token"),
              () -> assertEquals("Email not valid", formatMessage)
      );
   }

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
