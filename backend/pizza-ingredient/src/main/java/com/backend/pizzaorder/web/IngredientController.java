package com.backend.pizzaorder.web;

import com.backend.pizzaorder.domain.service.IngredientService;
import com.backend.pizzaorder.exceptions.NotAllowedException;
import com.backend.pizzaorder.persistence.entity.IngredientEntity;
import com.backend.pizzaorder.web.dto.IngredientDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class IngredientController {

   private final IngredientService ingredientService;

   @Autowired
   public IngredientController(IngredientService ingredientService) {
      this.ingredientService = ingredientService;
   }

   @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<List<IngredientEntity>> getAllIngredients() {
      var ingredientList = ingredientService.getAllIngredients();

      return (ingredientList.isEmpty()) ?
              new ResponseEntity<>(HttpStatus.NOT_FOUND) :
              new ResponseEntity<>(ingredientList, HttpStatus.OK);
   }

   @GetMapping(value = "/name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<Integer> getIdByIngredientName(@PathVariable String name) {
      var ingredientId = ingredientService.getIdByIngredientName(name);

      return ingredientId
              .map((id) -> new ResponseEntity<>(id, HttpStatus.OK))
              .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @GetMapping(value = "/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> getIngredientNameById(@PathVariable int id) {
      var ingredientName = ingredientService.getIngredientNameById(id);

      return ingredientName
              .map((ingredient) -> new ResponseEntity<>(ingredient, HttpStatus.OK))
              .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @PostMapping(value = "/save/one", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> saveIngredient(@Valid @RequestBody IngredientDto ingredientDto) throws NotAllowedException {
      ingredientService.saveIngredient(ingredientDto);
      return new ResponseEntity<>("Ingredient save correctly", HttpStatus.OK);
   }

   @PostMapping(value = "/save/list", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> saveIngredientList(@Valid @RequestBody List<IngredientDto> ingredientDto) throws NotAllowedException {
      ingredientService.saveIngredientList(ingredientDto);
      return new ResponseEntity<>("All ingredients save correctly", HttpStatus.OK);
   }
}
