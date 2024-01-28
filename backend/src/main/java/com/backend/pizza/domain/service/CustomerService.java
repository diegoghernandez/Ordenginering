package com.backend.pizza.domain.service;

import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.CustomerEntity;
import com.backend.pizza.web.dto.CustomerDto;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;

import java.util.Optional;

public interface CustomerService {

   void saveCustomer(CustomerDto customerDto) throws NotAllowedException;

   Optional<CustomerEntity> getCustomerById(long id);

   void updateName(String newName, NecessaryValuesForChangeDto forChangeDto) throws NotAllowedException;

   void updatePassword(String newPassword, NecessaryValuesForChangeDto forChangeDto) throws NotAllowedException;

   void updateEmail(String newEmail, NecessaryValuesForChangeDto forChangeDto) throws NotAllowedException;
}
