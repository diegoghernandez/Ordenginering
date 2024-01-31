package com.backend.pizza.domain.service;

import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.web.dto.IngredientDto;

import java.util.List;

public interface IngredientService {

   List<IngredientEntity> getAllIngredients();

   void saveIngredient(IngredientDto ingredientDto) throws NotAllowedException;

   void saveIngredientList(List<IngredientDto> ingredientDtoList) throws NotAllowedException;
}
