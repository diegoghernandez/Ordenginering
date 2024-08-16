package com.backend.pizzaingredient.domain.service;

import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.entity.Languages;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IngredientService {

   List<IngredientEntity> getAllIngredients();

   boolean existIngredientId(int id);

   Optional<Languages> getIngredientNameById(int id);

   void saveIngredient(IngredientDto ingredientDto, MultipartFile image) throws NotAllowedException, IOException;
}
