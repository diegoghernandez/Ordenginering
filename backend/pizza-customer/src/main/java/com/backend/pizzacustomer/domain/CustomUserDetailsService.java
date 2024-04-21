package com.backend.pizzacustomer.domain;

import com.backend.pizzacustomer.persistence.repository.CustomerRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

   private final CustomerRepository customerRepository;

   public CustomUserDetailsService(CustomerRepository customerRepository) {
      this.customerRepository = customerRepository;
   }

   @Override
   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      var customerEntity = customerRepository.findByEmail(email)
              .orElseThrow(() -> new UsernameNotFoundException("User " + email + " not found"));

      return User.builder()
              .username(customerEntity.getCustomerName())
              .password(customerEntity.getPassword())
              .disabled(customerEntity.getDisable())
              .build();
   }
}
