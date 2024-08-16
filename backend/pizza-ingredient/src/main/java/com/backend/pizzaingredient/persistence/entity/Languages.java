package com.backend.pizzaingredient.persistence.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Languages {

   @NotBlank
   private String en;

   @NotBlank
   private String es;
}
