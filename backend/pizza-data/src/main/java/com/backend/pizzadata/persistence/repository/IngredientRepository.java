package com.backend.pizzadata.persistence.repository;

import com.backend.pizzadata.persistence.entity.IngredientEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends ListCrudRepository<IngredientEntity, Integer> {
}
