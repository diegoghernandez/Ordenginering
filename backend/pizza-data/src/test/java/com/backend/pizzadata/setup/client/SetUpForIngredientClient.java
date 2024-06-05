package com.backend.pizzadata.setup.client;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.http.MediaType;

public class SetUpForIngredientClient extends SetUpForClient {

   static WireMockServer mockService = new WireMockServer(2222);

   @BeforeAll
   public static void setupMockCustomerResponse() {
      mockService.start();

      mockService.stubFor(WireMock.get(WireMock.urlPathEqualTo("/ingredient/name/Pepperoni"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("1").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      mockService.stubFor(WireMock.get(WireMock.urlPathEqualTo("/ingredient/name/Mozzarella"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("2").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      mockService.stubFor(WireMock.get(WireMock.urlPathEqualTo("/ingredient/name/Pineapple"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("3").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      mockService.stubFor(WireMock.get(WireMock.urlPathEqualTo("/ingredient/name/Ham"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("4").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      mockService.stubFor(WireMock.get(WireMock.urlPathEqualTo("/ingredient/id/3"))
              .willReturn(WireMock.aResponse().withStatus(200).withBody("Mozzarella").withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));
   }

   @AfterAll
   static void finish() {
      mockService.stop();
   }
}
