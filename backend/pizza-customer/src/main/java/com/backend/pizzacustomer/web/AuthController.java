package com.backend.pizzacustomer.web;

import com.backend.pizzacustomer.constants.TokenStatus;
import com.backend.pizzacustomer.domain.service.AuthService;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.domain.service.TokenService;
import com.backend.pizzacustomer.env.CookiesProperties;
import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.web.client.JwtClient;
import com.backend.pizzacustomer.web.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final CustomerService customerService;

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final JwtClient jwtClient;

    private final CookiesProperties cookiesProperties;

    public AuthController(
            CustomerService customerService,
            AuthService authService, TokenService tokenService,
            AuthenticationManager authenticationManager,
            JwtClient jwtClient,
            CookiesProperties cookiesProperties
    ) {
        this.customerService = customerService;
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtClient = jwtClient;
        this.cookiesProperties = cookiesProperties;
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerCustomer(
            @Valid @RequestBody CustomerDto customerDto
    ) throws NotAllowedException {
        if (!customerDto.password().equals(customerDto.matchingPassword())) {
            throw new NotAllowedException("Passwords don't match");
        }

        customerService.saveCustomer(customerDto);

        return new ResponseEntity<>("CREATED", HttpStatus.CREATED);
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> login(@RequestBody @Valid LoginDto loginDto) {
        authenticationManager.authenticate(new
                                                   UsernamePasswordAuthenticationToken(
                loginDto.email(), loginDto.password()));

        var customer = customerService.getCustomerByEmail(loginDto.email());

        String jwt = jwtClient.createJWT(customer.get().getIdCustomer());

        var cookie = ResponseCookie.from("jwt", jwt)
                                   .httpOnly(true).path("/")
                                   .sameSite(cookiesProperties.sameSite())
                                   .secure(cookiesProperties.secure())
                                   .domain(cookiesProperties.domain())
                                   .maxAge(TimeUnit.DAYS.toSeconds(15))
                                   .build().toString();

        var header = new HttpHeaders();
        header.set(HttpHeaders.SET_COOKIE, cookie);
        return new ResponseEntity<>(customer.get().getIdCustomer(), header, HttpStatus.OK);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.HEAD)
    public ResponseEntity<Void> logout() {
        var cookie = ResponseCookie.from("jwt", "")
                                   .httpOnly(true)
                                   .path("/")
                                   .sameSite(cookiesProperties.sameSite())
                                   .secure(cookiesProperties.secure())
                                   .domain(cookiesProperties.domain())
                                   .maxAge(0)
                                   .build().toString();

        var header = new HttpHeaders();
        header.set(HttpHeaders.SET_COOKIE, cookie);
        return new ResponseEntity<>(header, HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<TokenStatus> verifyToken(@RequestBody @Valid VerifyTokenDto verifyTokenDto) {
        var tokenStatus = authService.verifyToken(verifyTokenDto);

        return switch (tokenStatus) {
            case NONE, EXPIRED -> new ResponseEntity<>(tokenStatus, HttpStatus.BAD_REQUEST);
            case SUCCESSFUL -> new ResponseEntity<>(tokenStatus, HttpStatus.OK);
        };
    }

    @PostMapping("/send-reset-password")
    public ResponseEntity<String> sendResetPasswordToken(@RequestBody @Valid EmailDto emailDto) {
        authService.sendResetPasswordToken(emailDto.email());

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<TokenStatus> resetPasswordToken(@RequestBody @Valid VerifyTokenDto verifyTokenDto) {
        if (verifyTokenDto.newPassword() == null || verifyTokenDto.repeatNewPassword() == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else if (!verifyTokenDto.newPassword().equals(verifyTokenDto.repeatNewPassword()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        var tokenStatus = authService.verifyToken(verifyTokenDto);

        return switch (tokenStatus) {
            case NONE, EXPIRED -> new ResponseEntity<>(tokenStatus, HttpStatus.BAD_REQUEST);
            case SUCCESSFUL -> new ResponseEntity<>(tokenStatus, HttpStatus.OK);
        };
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendToken(
            @RequestBody @Valid ResendDto resendDto
    ) {
        authService.resendToken(resendDto.token());
        return ResponseEntity.ok("SUCCESS");
    }
}
