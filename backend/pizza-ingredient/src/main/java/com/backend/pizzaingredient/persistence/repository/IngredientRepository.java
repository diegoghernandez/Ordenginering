package com.backend.pizzaingredient.persistence.repository;

import com.backend.pizzaingredient.persistence.entity.IngredientEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends ListCrudRepository<IngredientEntity, Integer> {

   boolean existsByIngredientName(String name);

   @Query("SELECT idIngredient FROM IngredientEntity WHERE ingredientName = :name")
   Optional<Integer> findByIngredientName(String name);

   @Query("SELECT ingredientName FROM IngredientEntity WHERE idIngredient = :id")
   Optional<String> findByIdIngredient(int id);
}
