package com.backend.pizza.persistence.repository;

import com.backend.pizza.persistence.entity.OrderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<OrderEntity, UUID>, CrudRepository<OrderEntity, UUID> {
}
