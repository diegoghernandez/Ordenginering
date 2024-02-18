package com.backend.pizzadata.domain.service;

import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.IngredientEntity;
import com.backend.pizzadata.web.dto.IngredientDto;

import java.util.List;

public interface IngredientService {

   List<IngredientEntity> getAllIngredients();

   void saveIngredient(IngredientDto ingredientDto) throws NotAllowedException;

   void saveIngredientList(List<IngredientDto> ingredientDtoList) throws NotAllowedException;
}
