package com.backend.pizzacustomer.persistence.repository;

import com.backend.pizzacustomer.persistence.entity.TokenEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TokenRepository extends CrudRepository<TokenEntity, UUID> {
}
