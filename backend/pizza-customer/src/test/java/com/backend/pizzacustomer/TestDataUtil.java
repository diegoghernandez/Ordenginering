package com.backend.pizzacustomer;

import com.backend.pizzacustomer.persistence.entity.CustomerEntity;
import com.backend.pizzacustomer.web.dto.NecessaryValuesForChangeDto;
import jakarta.servlet.http.Cookie;

import java.time.LocalDate;
import java.time.LocalDateTime;

public final class TestDataUtil {

   private TestDataUtil() {}

   public static CustomerEntity getCustomer() {
      return CustomerEntity.builder()
              .idCustomer(4234L)
              .customerName("Customer")
              .email("random@names.com")
              .password("1234")
              .birthDate(LocalDate.of(2003, 10, 9))
              .disable(false)
              .creationTimestamp(LocalDateTime.of(2132, 7, 3, 23, 2, 23))
              .build();
   }

   public static NecessaryValuesForChangeDto getWrongNecessaryDtoForChangeMethods(long id) {
      return new NecessaryValuesForChangeDto(id,"Fake password");
   }

   public static NecessaryValuesForChangeDto getGoodNecessaryDtoForChangeMethods() {
      return new NecessaryValuesForChangeDto(4234L, "1234");
   }

   public static NecessaryValuesForChangeDto getDtoToUpdateMethods() {
      return new NecessaryValuesForChangeDto(64536L,"Correct password");
   }

   public static Cookie getCookie() {
      return new Cookie("jwt", "token");
   }
}
