package com.backend.pizzacustomer.controller;

import com.backend.pizzacustomer.TestDataUtil;
import com.backend.pizzacustomer.advice.PizzaCustomerExceptionHandler;
import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.setup.SetUpForJwtClient;
import com.backend.pizzacustomer.web.AuthController;
import com.backend.pizzacustomer.web.dto.*;
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
                LocalDate.of(2004, 2, 2), "es");

        var successCustomer = new CustomerDto(
                "Name", "norepeat@name.com", "1234",
                "1234", LocalDate.of(2004, 2, 2), "es");

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(objectMapper.writeValueAsString(
                                                                    passwordErrorCustomer)))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string("{\"desc\":\"Passwords don't match\"," +
                                                                             "\"fieldError\":null}")),

                () -> Mockito.verify(customerService, Mockito.times(0)).saveCustomer(successCustomer),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(objectMapper.writeValueAsString(successCustomer)))
                             .andExpect(MockMvcResultMatchers.status().isCreated())
                             .andExpect(MockMvcResultMatchers.content().string("CREATED")),

                () -> Mockito.verify(customerService, Mockito.times(1)).saveCustomer(successCustomer)
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
    @DisplayName("Should check the verification token and send the respective response")
    void verifyToken() {
        var badVerifyTokenDto = VerifyTokenDto.builder().token(UUID.randomUUID()).build();
        var goodVerifyTokenDto = VerifyTokenDto.builder().token(UUID.randomUUID()).build();

        Mockito.when(authService.verifyToken(badVerifyTokenDto)).thenReturn(TokenStatus.NONE);
        Mockito.when(authService.verifyToken(goodVerifyTokenDto)).thenReturn(TokenStatus.SUCCESSFUL);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/verify")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(
                                                                    objectMapper.writeValueAsString(badVerifyTokenDto)))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string(objectMapper.writeValueAsString(
                                                                     TokenStatus.NONE))),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .verifyToken(badVerifyTokenDto),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/verify")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(objectMapper.writeValueAsString(
                                                                    goodVerifyTokenDto)))
                             .andExpect(MockMvcResultMatchers.status().isOk())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string(objectMapper.writeValueAsString(
                                                                     TokenStatus.SUCCESSFUL))),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .verifyToken(goodVerifyTokenDto));
    }

    @Test
    @DisplayName("Should send a reset password token to the respective customer email")
    void sendResetPasswordToken() {
        var emailToSend = "random@names.com";

        Mockito.doNothing().when(authService).sendResetPasswordToken(new EmailDto(emailToSend, "en"));

        assertAll(
                () -> mockMvc.perform(
                                     MockMvcRequestBuilders.post("/auth/send-reset-password")
                                                           .contentType(MediaType.APPLICATION_JSON)
                                                           .content(objectMapper.writeValueAsString(
                                                                   new EmailDto(emailToSend, "en"))))
                             .andExpect(MockMvcResultMatchers.status().isOk())
                             .andExpect(MockMvcResultMatchers.content().string("SUCCESS")),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .sendResetPasswordToken(new EmailDto(emailToSend, "en"))
        );
    }

    @Test
    @DisplayName("Should reset the password if the token is valid and pass the password checks")
    void resetPasswordToken() {
        var emptyVerifyTokenDto = VerifyTokenDto.builder().token(UUID.randomUUID()).build();
        var noMatchVerifyTokenDto = VerifyTokenDto.builder()
                                                  .token(UUID.randomUUID())
                                                  .newPassword("test")
                                                  .repeatNewPassword("no-test")
                                                  .build();
        var badVerifyTokenDto = VerifyTokenDto.builder()
                                              .token(UUID.randomUUID())
                                              .newPassword("test")
                                              .repeatNewPassword("test")
                                              .build();
        var goodVerifyTokenDto = VerifyTokenDto.builder()
                                               .token(UUID.randomUUID())
                                               .newPassword("test")
                                               .repeatNewPassword("test")
                                               .build();

        Mockito.when(authService.verifyToken(badVerifyTokenDto)).thenReturn(TokenStatus.NONE);
        Mockito.when(authService.verifyToken(goodVerifyTokenDto)).thenReturn(TokenStatus.SUCCESSFUL);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/reset-password")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(
                                                                    objectMapper.writeValueAsString(
                                                                            emptyVerifyTokenDto)))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest()),

                () -> Mockito.verify(authService, Mockito.times(0))
                             .verifyToken(emptyVerifyTokenDto),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/reset-password")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(
                                                                    objectMapper.writeValueAsString(
                                                                            noMatchVerifyTokenDto)))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest()),

                () -> Mockito.verify(authService, Mockito.times(0))
                             .verifyToken(noMatchVerifyTokenDto),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/reset-password")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(
                                                                    objectMapper.writeValueAsString(badVerifyTokenDto)))
                             .andExpect(MockMvcResultMatchers.status().isBadRequest())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string(objectMapper.writeValueAsString(
                                                                     TokenStatus.NONE))),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .verifyToken(badVerifyTokenDto),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/auth/reset-password")
                                                            .contentType(MediaType.APPLICATION_JSON)
                                                            .content(objectMapper.writeValueAsString(
                                                                    goodVerifyTokenDto)))
                             .andExpect(MockMvcResultMatchers.status().isOk())
                             .andExpect(MockMvcResultMatchers.content()
                                                             .string(objectMapper.writeValueAsString(
                                                                     TokenStatus.SUCCESSFUL))),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .verifyToken(goodVerifyTokenDto));
    }

    @Test
    @DisplayName("Should receive the expire token and resend it to the customer email")
    void resendToken() {
        var oldToken = UUID.randomUUID();

        Mockito.doNothing().when(authService).resendToken(oldToken, "en");

        assertAll(
                () -> mockMvc.perform(
                                     MockMvcRequestBuilders.post("/auth/resend")
                                                           .contentType(MediaType.APPLICATION_JSON)
                                                           .content(objectMapper.writeValueAsString(
                                                                   new ResendDto(oldToken, "en"))))
                             .andExpect(MockMvcResultMatchers.status().isOk())
                             .andExpect(MockMvcResultMatchers.content().string("SUCCESS")),

                () -> Mockito.verify(authService, Mockito.times(1))
                             .resendToken(oldToken, "en")
        );
    }
}
