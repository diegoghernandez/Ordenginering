package com.backend.pizzaingredient.web;

import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.entity.Languages;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping
public class IngredientController {

   private final IngredientService ingredientService;

   public IngredientController(IngredientService ingredientService) {
      this.ingredientService = ingredientService;
   }

   @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<List<IngredientEntity>> getAllIngredients() {
      var ingredientList = ingredientService.getAllIngredients();

      return (ingredientList.isEmpty()) ?
              new ResponseEntity<>(HttpStatus.NOT_FOUND) :
              new ResponseEntity<>(ingredientList, HttpStatus.OK);
   }

   @RequestMapping(value = "/id/{id}", method = RequestMethod.HEAD)
   public ResponseEntity<Void> existIngredientId(@PathVariable int id) {
      if (ingredientService.existIngredientId(id)) return new ResponseEntity<>(HttpStatus.OK);

      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @GetMapping(value = "/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<Languages> getIngredientNameById(@PathVariable int id) {
      var ingredientName = ingredientService.getIngredientNameById(id);

      return ingredientName
              .map((ingredient) -> new ResponseEntity<>(ingredient, HttpStatus.OK))
              .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
   public ResponseEntity<String> saveIngredient(
           @RequestPart("file") MultipartFile image,
           @Valid @RequestPart("ingredient") IngredientDto ingredientDto
   ) throws NotAllowedException, IOException {
      if (image.isEmpty()) return new ResponseEntity<>("Image is required", HttpStatus.BAD_REQUEST);
      else if (!Objects.requireNonNull(image.getContentType()).matches("image/(jpeg|png|bmp|webmp|gif)")) {
         return new ResponseEntity<>(
                 "Image type is not one of the following supported: jpeg, png, bmp, webmp, gif",
                 HttpStatus.BAD_REQUEST
         );
      }

      ingredientService.saveIngredient(ingredientDto, image);
      return new ResponseEntity<>("Ingredient save correctly", HttpStatus.OK);
   }
}
