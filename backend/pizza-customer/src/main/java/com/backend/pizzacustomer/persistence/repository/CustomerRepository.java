package com.backend.pizzacustomer.persistence.repository;

import com.backend.pizzacustomer.persistence.entity.CustomerEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CustomerRepository extends CrudRepository<CustomerEntity, Long> {

   Optional<CustomerEntity> findByEmail(String email);

   boolean existsByEmail(String email);

   @Modifying
   @Transactional
   @Query("UPDATE CustomerEntity AS cust SET cust.customerName = :name, cust.birthDate = :birthDate WHERE cust.idCustomer = :id")
   void changeProfile(@Param("name") String newName, @Param("birthDate") LocalDate birthDate, long id);

   @Modifying
   @Transactional
   @Query("UPDATE CustomerEntity AS cust SET cust.password = :pass WHERE cust.idCustomer = :id")
   void changePassword(@Param("pass") String newPassword, long id);

   @Modifying
   @Transactional
   @Query("UPDATE CustomerEntity AS cust SET cust.email = :email WHERE cust.idCustomer = :id")
   void changeEmail(@Param("email") String newEmail, long id);
}
