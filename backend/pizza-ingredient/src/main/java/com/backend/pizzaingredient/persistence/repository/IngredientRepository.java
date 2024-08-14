package com.backend.pizzaingredient.persistence.repository;

import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import com.backend.pizzaingredient.persistence.entity.IngredientName;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends ListCrudRepository<IngredientEntity, Integer> {

   @Query(value = "SELECT `id_ingredient` FROM `ingredient` "
           + "WHERE `ingredient_name` -> '$.en' = :name OR "
           + "`ingredient_name` -> '$.es' = :name "
           + "LIMIT 1;", nativeQuery = true
   )
   Optional<Integer> findByNameIfExist(String name);

   @Query("SELECT ingredientName FROM IngredientEntity WHERE idIngredient = :id")
   Optional<IngredientName> findByIdIngredient(int id);
}
