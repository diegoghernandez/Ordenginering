package com.backend.pizzacustomer.domain.service;

import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.persistence.entity.CustomerEntity;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.backend.pizzacustomer.web.dto.NecessaryValuesForChangeDto;
import com.backend.pizzacustomer.web.dto.ValuesForChangeProfile;

import java.util.Map;
import java.util.Optional;

public interface CustomerService {

   void saveCustomer(CustomerDto customerDto) throws NotAllowedException;

   Optional<CustomerEntity> getCustomerById(long id);

   Optional<CustomerEntity> getCustomerByEmail(String email);

   Map.Entry<Integer, String> changeProfile(ValuesForChangeProfile valuesForChangeProfile);

   Map.Entry<Integer, String> changePassword(String newPassword, NecessaryValuesForChangeDto forChangeDto);

   Map.Entry<Integer, String> changeEmail(String newEmail, NecessaryValuesForChangeDto forChangeDto);
}
