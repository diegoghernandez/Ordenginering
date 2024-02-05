package com.backend.pizza.domain.service;

import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.CustomerEntity;
import com.backend.pizza.web.dto.CustomerDto;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;

import java.util.Map;
import java.util.Optional;

public interface CustomerService {

   void saveCustomer(CustomerDto customerDto) throws NotAllowedException;

   Optional<CustomerEntity> getCustomerById(long id);

   Map.Entry<Integer, String> changeName(String newName, NecessaryValuesForChangeDto forChangeDto);

   Map.Entry<Integer, String> changePassword(String newPassword, NecessaryValuesForChangeDto forChangeDto);

   Map.Entry<Integer, String> changeEmail(String newEmail, NecessaryValuesForChangeDto forChangeDto);
}
