package com.backend.pizza.domain;

import com.backend.pizza.domain.service.IngredientService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.web.dto.IngredientDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService {

   @Override
   public List<IngredientEntity> getAllIngredients() {
      return List.of(
              IngredientEntity.builder()

                   .idIngredient(4324L)
                   .ingredientName("Queso")
                   .urlImage("Author")
                   .authorImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                   .build(),

              IngredientEntity.builder()
                    .idIngredient(65437L)
                    .ingredientName("Pizza")
                    .urlImage("Author")
                    .authorImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                    .build()
      );
   }

   @Override
   public void saveIngredient(IngredientDto ingredientDto) throws NotAllowedException {
      var ingredientEntity = convertIngredientDtoToEntity(Collections.singletonList(ingredientDto)).getFirst();
   }

   @Override
   public void saveIngredientList(List<IngredientDto> ingredientDtoList) throws NotAllowedException {
      var ingredientEntityList = convertIngredientDtoToEntity(ingredientDtoList);
   }

   private List<IngredientEntity> convertIngredientDtoToEntity(List<IngredientDto> ingredientDtoList) throws NotAllowedException {
      var ingredientList = new ArrayList<IngredientEntity>();

      for(var ingredientDto : ingredientDtoList) {
         if (ingredientDto.ingredientName().equals("No repeat"))
            throw new NotAllowedException("Repeat names are not allowed");

         ingredientList.add(
            IngredientEntity.builder()
                    .ingredientName(ingredientDto.ingredientName())
                    .urlImage(ingredientDto.urlImage())
                    .authorImage(ingredientDto.authorImage())
                    .build()
         );
      }

      return ingredientList;
   }
}
