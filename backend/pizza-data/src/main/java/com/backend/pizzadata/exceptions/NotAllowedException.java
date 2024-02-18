package com.backend.pizzadata.exceptions;

import lombok.Getter;

@Getter
public class NotAllowedException extends Exception {

   private final String message;

   public NotAllowedException(String message) {
      super(message);
      this.message = message;
   }
}
