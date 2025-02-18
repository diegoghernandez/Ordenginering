package com.backend.pizzacustomer.controller;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.advice.PizzaCustomerExceptionHandler;
import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.setup.SetUpForJwtClient;
import com.backend.pizzacustomer.web.AuthController;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.backend.pizzacustomer.web.dto.LoginDto;
import com.backend.pizzacustomer.web.dto.ResendDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("test")
class AuthControllerTest implements SetUpForJwtClient {

    private MockMvc mockMvc;

    @Autowired
    private AuthController authController;

    @MockitoBean
    private CustomerService customerService;

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private AuthenticationManager authenticationManager;

    @Autowired
    private PizzaCustomerExceptionHandler exceptionHandler;

    ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(authController).setControllerAdvice(exceptionHandler).build();
    }

    @Test
    @DisplayName("Should register a customer correctly")
    void registerCustomer() {
        var passwordErrorCustomer = new CustomerDto(
                "Name", "norepeat@name.com", "1234", "43252543",
                LocalDate.of(2004, 2, 2));

        var successCustomer = new CustomerDto("Name", "norepeat@name.com", "1234", "1234", LocalDate.of(2004, 2, 2));

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(objectMapper.writeValueAsString(
                                                                    passwordErrorCustomer)))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string("{\"desc\":\"Passwords don't match\"," +
                                                                             "\"fieldError\":null}")),

                () -> Mockito.verify(customerService, Mockito.times(0)).saveCustomer(Mockito.eq(successCustomer)),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(objectMapper.writeValueAsString(successCustomer)))
                             .andExpect(MockMvcResultMatchers.status().isCreated())
                             .andExpect(MockMvcResultMatchers.content().string("Account create successfully")),

                () -> Mockito.verify(customerService, Mockito.times(1)).saveCustomer(Mockito.eq(successCustomer))
        );
    }

    @Test
    @DisplayName("Should log in with the right credentials and get a cookie or get a status 401")
    void loginCustomer() {
        var loginDto = new LoginDto("random@names.com", "1234");

        Mockito.when(authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("random@names.com", "1234"))).thenReturn(null);

        Mockito.when(customerService.getCustomerByEmail("random@names.com"))
               .thenReturn(Optional.of(TestDataUtil.getCustomer()));

        assertAll(() -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                                                              .contentType(MediaType.APPLICATION_JSON)
                                                              .content(objectMapper.writeValueAsString(loginDto)))
                               .andExpect(MockMvcResultMatchers.status().isOk())
                               .andExpect(MockMvcResultMatchers.header().exists(HttpHeaders.SET_COOKIE))
                               .andExpect(MockMvcResultMatchers.content().string("4234"))
        );
    }

    @Test
    @DisplayName("Should log in with the right credentials and get a cookie or get a status 401")
    void verifyAccount() {
        var tokenWrongId = UUID.randomUUID();
        var tokenVerifiedId = UUID.randomUUID();

        Mockito.when(authService.veryAccount(tokenWrongId)).thenReturn(TokenStatus.NONE);

        Mockito.when(authService.veryAccount(tokenVerifiedId)).thenReturn(TokenStatus.SUCCESSFUL);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.get("/auth/verify/" + tokenWrongId)
                                                            .contentType(MediaType.APPLICATION_JSON))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string(objectMapper.writeValueAsString(
                                                                     TokenStatus.NONE))),

                () -> mockMvc.perform(MockMvcRequestBuilders.get("/auth/verify/" + tokenVerifiedId)
                                                            .contentType(MediaType.APPLICATION_JSON))
                             .andExpect(MockMvcResultMatchers.status().isOk())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string(objectMapper.writeValueAsString(
                                                                     TokenStatus.SUCCESSFUL))));
    }

    @Test
    @DisplayName("Should log in with the right credentials and get a cookie or get a status 401")
    void resendToken() {
        var oldToken = UUID.randomUUID();

        Mockito.doNothing().when(authService).resendVerificationToken(oldToken);

        assertAll(
                () -> mockMvc.perform(
                                     MockMvcRequestBuilders.post("/auth/resend")
                                                           .contentType(MediaType.APPLICATION_JSON)
                                                           .content(objectMapper.writeValueAsString(
                                                                   new ResendDto(oldToken))))
                             .andExpect(MockMvcResultMatchers.status().isOk())
                             .andExpect(MockMvcResultMatchers.content().string("SUCCESS")),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .resendVerificationToken(oldToken),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/resend")));
    }
}
