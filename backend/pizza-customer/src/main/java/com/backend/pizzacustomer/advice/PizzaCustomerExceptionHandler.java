package com.backend.pizzacustomer.advice;

import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.web.dto.PizzaCustomerExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;

@ControllerAdvice
public class PizzaCustomerExceptionHandler {
   
   @ExceptionHandler(MethodArgumentNotValidException.class)
   protected ResponseEntity<PizzaCustomerExceptionDto> handleInvalidArgument(MethodArgumentNotValidException ex) {
      var errorMap = new HashMap<String, String>();
      ex.getBindingResult().getFieldErrors().forEach(error ->
              errorMap.put(error.getField(),
              error.getDefaultMessage().substring(0, 1).toUpperCase() + error.getDefaultMessage().substring(1))
      );

      var pizzaDataExceptionHandler = new PizzaCustomerExceptionDto(
              "Invalid request content",
              errorMap
      );

      return new ResponseEntity<>(pizzaDataExceptionHandler, HttpStatus.BAD_REQUEST);
   }

   @ExceptionHandler(NotAllowedException.class)
   protected ResponseEntity<PizzaCustomerExceptionDto> handleInvalidArgument(NotAllowedException ex) {
      var pizzaDataExceptionHandler = new PizzaCustomerExceptionDto(
              ex.getMessage(),
              null
      );

      return new ResponseEntity<>(pizzaDataExceptionHandler, HttpStatus.BAD_REQUEST);
   }
}
