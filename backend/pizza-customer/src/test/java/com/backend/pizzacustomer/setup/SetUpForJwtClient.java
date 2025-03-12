package com.backend.pizzacustomer.setup;

import com.backend.pizzacustomer.TestDataUtil;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@EnableFeignClients
public interface SetUpForJwtClient {

    WireMockServer mockService = new WireMockServer(3000);

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.jpa.defer-datasource-initialization", () -> false);
        registry.add("spring.sql.init.mode", () -> "never");
    }

    @BeforeAll
    static void setupMockJWtResponse() {
        mockService.start();

        mockService.stubFor(WireMock.get(WireMock.urlPathMatching("/api/jwt/create/4234"))
                                    .willReturn(WireMock.aResponse()
                                                        .withStatus(200)
                                                        .withBody("token")
                                                        .withHeader("Content-Type", MediaType.TEXT_HTML_VALUE)));

        mockService.stubFor(WireMock.get(WireMock.urlPathMatching("/api/jwt/create/95679"))
                                    .willReturn(WireMock.aResponse()
                                                        .withStatus(400)
                                                        .withBody("Email not valid")
                                                        .withHeader("Content-Type", MediaType.TEXT_HTML_VALUE)));

        mockService.stubFor(
                WireMock.get(WireMock.urlPathMatching("/api/jwt/verify/" + TestDataUtil.getCookie().getValue()))
                        .willReturn(WireMock.aResponse()
                                            .withStatus(200)
                                            .withBody("{\"id\": 321, \"role\":\"USER\"}")
                                            .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

        mockService.stubFor(WireMock.get(WireMock.urlPathMatching("/api/jwt/verify/invalid"))
                                    .willReturn(WireMock.aResponse()
                                                        .withStatus(401)));
    }
}
