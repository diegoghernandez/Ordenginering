package com.backend.pizzaingredient.domain.service;

import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.web.dto.IngredientDto;

import java.util.List;
import java.util.Optional;

public interface IngredientService {

   List<IngredientEntity> getAllIngredients();

   Optional<Integer> getIdByIngredientName(String name);

   Optional<String> getIngredientNameById(int id);

   void saveIngredient(IngredientDto ingredientDto) throws NotAllowedException;

   void saveIngredientList(List<IngredientDto> ingredientDtoList) throws NotAllowedException;

}
