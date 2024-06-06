package com.backend.pizzaingredient.domain;

import com.backend.pizzaingredient.domain.service.IngredientService;
import com.backend.pizzaingredient.exceptions.NotAllowedException;
import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.repository.IngredientRepository;
import com.backend.pizzaingredient.web.dto.IngredientDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {

   private final IngredientRepository ingredientRepository;

   public IngredientServiceImpl(IngredientRepository ingredientRepository) {
      this.ingredientRepository = ingredientRepository;
   }

   @Override
   public List<IngredientEntity> getAllIngredients() {
      return ingredientRepository.findAll();
   }

   @Override
   public Optional<Integer> getIdByIngredientName(String name) {
      return ingredientRepository.findByIngredientName(name);
   }

   @Override
   public Optional<String> getIngredientNameById(int id) {
      return ingredientRepository.findByIdIngredient(id);
   }

   @Override
   public void saveIngredient(IngredientDto ingredientDto) throws NotAllowedException {
      var ingredientEntity = convertIngredientDtoToEntity(Collections.singletonList(ingredientDto)).getFirst();

      if (ingredientRepository.existsByIngredientName(ingredientDto.ingredientName()))
         throw new NotAllowedException("Repeat names are not allowed");

      ingredientRepository.save(ingredientEntity);
   }

   @Override
   public void saveIngredientList(List<IngredientDto> ingredientDtoList) throws NotAllowedException {
      var ingredientEntityList = convertIngredientDtoToEntity(ingredientDtoList);

      ingredientRepository.saveAll(ingredientEntityList);
   }

   private List<IngredientEntity> convertIngredientDtoToEntity(List<IngredientDto> ingredientDtoList) throws NotAllowedException {
      var ingredientList = new ArrayList<IngredientEntity>();

      for (var ingredientDto : ingredientDtoList) {
         if (ingredientRepository.existsByIngredientName(ingredientDto.ingredientName()))
            throw new NotAllowedException("Repeat names are not allowed");

         ingredientList.add(
                 IngredientEntity.builder()
                         .ingredientName(ingredientDto.ingredientName())
                         .ingredientType(ingredientDto.ingredientType())
                         .urlImage(ingredientDto.urlImage())
                         .authorImage(ingredientDto.authorImage())
                         .build()
         );
      }

      return ingredientList;
   }
}
