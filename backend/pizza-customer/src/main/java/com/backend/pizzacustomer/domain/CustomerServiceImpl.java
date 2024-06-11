package com.backend.pizzacustomer.domain;

import com.backend.pizzacustomer.domain.message.CustomerMessage;
import com.backend.pizzacustomer.domain.service.CustomerService;
import com.backend.pizzacustomer.exceptions.NotAllowedException;
import com.backend.pizzacustomer.persistence.entity.CustomerEntity;
import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import com.backend.pizzacustomer.web.dto.CustomerDto;
import com.backend.pizzacustomer.web.dto.NecessaryValuesForChangeDto;
import com.backend.pizzacustomer.web.dto.ValuesForChangeProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.AbstractMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

   private final CustomerRepository customerRepository;

   private final PasswordEncoder passwordEncoder;

   private final CustomerMessage customerMessage;

   @Autowired
   public CustomerServiceImpl(CustomerRepository customerRepository, PasswordEncoder passwordEncoder, CustomerMessage customerMessage) {
      this.customerRepository = customerRepository;
      this.passwordEncoder = passwordEncoder;
      this.customerMessage = customerMessage;
   }

   @Override
   public void saveCustomer(CustomerDto customerDto) throws NotAllowedException {
      if (customerRepository.existsByEmail(customerDto.email())) throw new NotAllowedException("Email already used");
      else if (!customerDto.birthDate().plusYears(18).isBefore(LocalDate.now()))
         throw new NotAllowedException("No older enough");

      var customer = CustomerEntity.builder()
              .customerName(customerDto.customerName())
              .email(customerDto.email())
              .password(passwordEncoder.encode(customerDto.password()))
              .birthDate(customerDto.birthDate())
              .disable(false)
              .creationTimestamp(LocalDateTime.now())
              .build();

      var customerSaved = customerRepository.save(customer);
      customerMessage.sendCustomerRoleMessage(customerSaved.getIdCustomer());
   }

   @Override
   public Optional<CustomerEntity> getCustomerById(long id) {
      return customerRepository.findById(id);
   }

   @Override
   public Optional<CustomerEntity> getCustomerByEmail(String email) {
      return customerRepository.findByEmail(email);
   }

   @Override
   public Map.Entry<Integer, String> changeProfile(ValuesForChangeProfile valuesForChangeProfile) {
      if (!customerRepository.existsById(valuesForChangeProfile.valuesForChangeDto().id()))
         return new AbstractMap.SimpleEntry<>(404, "Id doesn't exist");

      customerRepository.changeProfile(
              valuesForChangeProfile.name(),
              valuesForChangeProfile.birthDate(),
              valuesForChangeProfile.valuesForChangeDto().id()
      );

      return new AbstractMap.SimpleEntry<>(200, "Change profile correctly");
   }

   @Override
   public Map.Entry<Integer, String> changePassword(String newPassword, NecessaryValuesForChangeDto forChangeDto){
      var result = validateNecessaryValues(forChangeDto, "Change password correctly");

      if (result.getKey().equals(200)) customerRepository.changePassword(
              passwordEncoder.encode(newPassword),
              forChangeDto.id()
      );

      return result;
   }

   @Override
   public Map.Entry<Integer, String> changeEmail(String newEmail, NecessaryValuesForChangeDto forChangeDto) {
      var result = validateNecessaryValues(forChangeDto, "Change email correctly");

      if (result.getKey().equals(200)) customerRepository.changeEmail(newEmail, forChangeDto.id());

      return result;
   }

   private Map.Entry<Integer, String> validateNecessaryValues(NecessaryValuesForChangeDto valuesForChangeDto, String desireMessage) {
      if (!customerRepository.existsById(valuesForChangeDto.id())) return new AbstractMap.SimpleEntry<>(404, "Id doesn't exist");

      var customerEntity = customerRepository.findById(valuesForChangeDto.id()).get();
      if (!passwordEncoder.matches(valuesForChangeDto.password(), customerEntity.getPassword())) {
         return new AbstractMap.SimpleEntry<>(400, "Incorrect password");
      }

      return new AbstractMap.SimpleEntry<>(200, desireMessage);
   }

}
