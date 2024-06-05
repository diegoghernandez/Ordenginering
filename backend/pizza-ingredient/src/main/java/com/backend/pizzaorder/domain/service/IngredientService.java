package com.backend.pizzaorder.domain.service;

import com.backend.pizzaorder.exceptions.NotAllowedException;
import com.backend.pizzaorder.persistence.entity.IngredientEntity;
import com.backend.pizzaorder.web.dto.IngredientDto;

import java.util.List;
import java.util.Optional;

public interface IngredientService {

   List<IngredientEntity> getAllIngredients();

   Optional<Integer> getIdByIngredientName(String name);

   Optional<String> getIngredientNameById(int id);

   void saveIngredient(IngredientDto ingredientDto) throws NotAllowedException;

   void saveIngredientList(List<IngredientDto> ingredientDtoList) throws NotAllowedException;

}
