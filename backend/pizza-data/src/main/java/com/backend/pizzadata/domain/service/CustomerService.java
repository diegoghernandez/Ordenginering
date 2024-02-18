package com.backend.pizzadata.domain.service;

import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.CustomerEntity;
import com.backend.pizzadata.web.dto.CustomerDto;
import com.backend.pizzadata.web.dto.NecessaryValuesForChangeDto;

import java.util.Map;
import java.util.Optional;

public interface CustomerService {

   void saveCustomer(CustomerDto customerDto) throws NotAllowedException;

   Optional<CustomerEntity> getCustomerById(long id);

   Map.Entry<Integer, String> changeName(String newName, NecessaryValuesForChangeDto forChangeDto);

   Map.Entry<Integer, String> changePassword(String newPassword, NecessaryValuesForChangeDto forChangeDto);

   Map.Entry<Integer, String> changeEmail(String newEmail, NecessaryValuesForChangeDto forChangeDto);
}
