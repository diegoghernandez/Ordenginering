package com.backend.pizzaorder.persistence.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Languages {

   @NotBlank
   private String en;

   @NotBlank
   private String es;
}
