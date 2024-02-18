package com.backend.pizzadata.persistence.repository;

import com.backend.pizzadata.persistence.entity.CustomerEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<CustomerEntity, Long> {

   boolean existsByEmail(String email);

   @Modifying
   @Transactional
   @Query("UPDATE CustomerEntity AS cust SET cust.customerName = :name WHERE cust.idCustomer = :id")
   void changeName(@Param("name") String newName, long id);

   @Modifying
   @Transactional
   @Query("UPDATE CustomerEntity AS cust SET cust.password = :pass WHERE cust.idCustomer = :id")
   void changePassword(@Param("pass") String newPassword, long id);

   @Modifying
   @Transactional
   @Query("UPDATE CustomerEntity AS cust SET cust.email = :email WHERE cust.idCustomer = :id")
   void changeEmail(@Param("email") String newEmail, long id);
}
