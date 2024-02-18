package com.backend.pizzadata.web;

import com.backend.pizzadata.domain.service.IngredientService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.IngredientEntity;
import com.backend.pizzadata.web.dto.IngredientDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {

   private final IngredientService ingredientService;

   @Autowired
   public IngredientController(IngredientService ingredientService) {
      this.ingredientService = ingredientService;
   }

   @GetMapping(value = "/all", produces = {"application/json"})
   public ResponseEntity<List<IngredientEntity>> getAllIngredients() {
      var ingredientList = ingredientService.getAllIngredients();

      return (ingredientList.isEmpty()) ?
              new ResponseEntity<>(HttpStatus.NOT_FOUND) :
              new ResponseEntity<>(ingredientList, HttpStatus.OK);
   }

   @PostMapping(value = "/save/one", produces = {"application/json"})
   public ResponseEntity<String> saveIngredient(@Valid @RequestBody IngredientDto ingredientDto) {
      try {
         ingredientService.saveIngredient(ingredientDto);
         return new ResponseEntity<>("Ingredient save correctly", HttpStatus.OK);
      } catch (NotAllowedException e) {
         return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
      }
   }

   @PostMapping(value = "/save/list", produces = {"application/json"})
   public ResponseEntity<String> saveIngredientList(@Valid @RequestBody List<IngredientDto> ingredientDto) {
      try {
         ingredientService.saveIngredientList(ingredientDto);
         return new ResponseEntity<>("All ingredients save correctly", HttpStatus.OK);
      } catch (NotAllowedException e) {
         return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
      }
   }
}
