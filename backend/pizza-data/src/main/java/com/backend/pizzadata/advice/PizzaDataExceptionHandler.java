package com.backend.pizzadata.advice;

import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.web.dto.PizzaDataExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class PizzaDataExceptionHandler {

   @ExceptionHandler(MethodArgumentNotValidException.class)
   protected ResponseEntity<PizzaDataExceptionDto> handleInvalidArgument(MethodArgumentNotValidException ex) {
      Map<String, String> errorMap = new HashMap<>();
      ex.getBindingResult().getFieldErrors().forEach(error ->
              errorMap.put(error.getField(),
              error.getDefaultMessage().substring(0, 1).toUpperCase() + error.getDefaultMessage().substring(1))
      );

      var pizzaDataExceptionHandler = new PizzaDataExceptionDto(
              "Invalid request content",
              errorMap
      );

      return new ResponseEntity<>(pizzaDataExceptionHandler, HttpStatus.BAD_REQUEST);
   }

   @ExceptionHandler(NotAllowedException.class)
   protected ResponseEntity<PizzaDataExceptionDto> handleInvalidArgument(NotAllowedException ex) {
      var pizzaDataExceptionHandler = new PizzaDataExceptionDto(
              ex.getMessage(),
              null
      );

      return new ResponseEntity<>(pizzaDataExceptionHandler, HttpStatus.BAD_REQUEST);
   }
}
