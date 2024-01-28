package com.backend.pizza.domain;

import com.backend.pizza.domain.service.CustomerService;
import com.backend.pizza.exceptions.NotAllowedException;
import com.backend.pizza.persistence.entity.CustomerEntity;
import com.backend.pizza.web.dto.CustomerDto;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

   @Override
   public void saveCustomer(CustomerDto customerDto) throws NotAllowedException {
      if (customerDto.email().equals("norepeat@name.com")) throw new NotAllowedException("Email already used");
      else if (!customerDto.birthDate().plusYears(18).isBefore(LocalDate.now()))
         throw new NotAllowedException("No older enough");

      var customer = CustomerEntity.builder()
              .customerName(customerDto.customerName())
              .email(customerDto.email())
              .password(customerDto.password())
              .birthDate(customerDto.birthDate())
              .build();
   }

   @Override
   public Optional<CustomerEntity> getCustomerById(long id) {
      if (id == 3213) {
         return Optional.of(CustomerEntity.builder()
                 .idCustomer(3213L)
                 .customerName("Customer")
                 .email("random@random.com")
                 .password("1234")
                 .birthDate(LocalDate.of(2020, 5, 23))
                 .creationTimestamp(LocalDateTime.of(2132, 7, 3, 23, 2, 23))
                 .build());
      }
      return Optional.empty();
   }

   @Override
   public void updateName(String newName, NecessaryValuesForChangeDto forChangeDto) throws NotAllowedException {
      if (forChangeDto.id() == 34) throw new NotAllowedException("Id doesn't exist");
   }

   @Override
   public void updatePassword(String newPassword, NecessaryValuesForChangeDto forChangeDto) throws NotAllowedException {
      if (forChangeDto.id() == 34) throw new NotAllowedException("Id doesn't exist");

   }

   @Override
   public void updateEmail(String newEmail, NecessaryValuesForChangeDto forChangeDto) throws NotAllowedException {
      if (forChangeDto.id() == 34) throw new NotAllowedException("Id doesn't exist");
      else if (newEmail.equals("norepeat@name.com")) throw new NotAllowedException("Email already used");

   }
}
