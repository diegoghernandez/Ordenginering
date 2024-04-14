package com.backend.pizzadata.persistence.repository;

import com.backend.pizzadata.persistence.entity.IngredientEntity;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends ListCrudRepository<IngredientEntity, Integer> {

   boolean existsByIngredientName(String name);

   Optional<IngredientEntity> findByIngredientName(String name);
}
