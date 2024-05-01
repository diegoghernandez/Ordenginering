package com.backend.pizzadata.setup.client;

import com.backend.pizzadata.TestDataUtil;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.http.MediaType;

public class SetUpForJwtClient extends SetUpForClient {

   static WireMockServer mockService = new WireMockServer(3000);

   @BeforeAll
   public static void setupMockCustomerResponse() {
      mockService.start();

      mockService.stubFor(WireMock.get(WireMock.urlPathMatching("/jwt/verify/" + TestDataUtil.getCookie().getValue()))
              .willReturn(WireMock.aResponse()
                      .withStatus(200)
                      .withBody("{\"roles\":[\"USER\"], \"subject\": \"email@example.com\"}")
                      .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

      mockService.stubFor(WireMock.get(WireMock.urlPathMatching("/jwt/verify/invalid"))
              .willReturn(WireMock.aResponse()
                      .withStatus(401)));
   }
}
