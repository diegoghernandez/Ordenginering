package com.backend.pizzaorder.persistence.repository;

import com.backend.pizzaorder.persistence.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<OrderEntity, UUID>, CrudRepository<OrderEntity, UUID> {

   Optional<Page<OrderEntity>> findByIdCustomerOrderByOrderTimestampDesc(@Param("id") long idCustomer, Pageable pageable);
}
