package com.backend.pizzadata.setup.client;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

public class SetUpForCustomerClient extends SetUpForClient{

   static WireMockServer mockService = new WireMockServer(8765);

   @BeforeAll
   public static void setupMockCustomerResponse() {
      mockService.start();

      mockService.stubFor(WireMock.head(WireMock.urlPathMatching("/customer/exist/2"))
              .willReturn(WireMock.status(200)));

      mockService.stubFor(WireMock.head(WireMock.urlPathMatching("/customer/exist/8789"))
              .willReturn(WireMock.status(404)));
   }

   @AfterAll
   static void finish() {
      mockService.stop();
   }
}
