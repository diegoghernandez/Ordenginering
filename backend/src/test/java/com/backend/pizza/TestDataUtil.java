package com.backend.pizza;

import com.backend.pizza.constants.Size;
import com.backend.pizza.persistence.entity.CustomerEntity;
import com.backend.pizza.persistence.entity.IngredientEntity;
import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.persistence.entity.PizzaEntity;
import com.backend.pizza.web.dto.NecessaryValuesForChangeDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public final class TestDataUtil {

   private TestDataUtil() {}

   public static CustomerEntity getCustomer() {
      return CustomerEntity.builder()
              .idCustomer(4532L)
              .customerName("Customer")
              .email("random@random.com")
              .password("1234")
              .birthDate(LocalDate.of(2020, 5, 23))
              .creationTimestamp(LocalDateTime.of(2132, 7, 3, 23, 2, 23))
              .build();
   }

   public static NecessaryValuesForChangeDto getWrongNecessaryDtoForChangeMethods(long id) {
      return new NecessaryValuesForChangeDto(id,"Fake password");
   }

   public static NecessaryValuesForChangeDto getGoodNecessaryDtoForChangeMethods() {
      return new NecessaryValuesForChangeDto(4532L, "1234");
   }

   public static NecessaryValuesForChangeDto getDtoToUpdateMethods() {
      return new NecessaryValuesForChangeDto(64536L,"Correct password");
   }

   public static List<IngredientEntity> getIngredientList() {
      return List.of(
              IngredientEntity.builder()
                      .idIngredient(4324L)
                      .ingredientName("Queso")
                      .urlImage("Author")
                      .authorImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(65437L)
                      .ingredientName("Pizza")
                      .urlImage("Author")
                      .authorImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build()
      );
   }

   public static List<PizzaEntity> getPizzaList() {
      return Arrays.asList(
         PizzaEntity.builder()
                 .idPizza(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .idOrder(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .pizzaName("custom")
                 .price(3123)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                 .build(),

         PizzaEntity.builder()
                 .idPizza(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .idOrder(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .pizzaName("custom")
                 .price(3123)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                 .build()
      );
   }

   public static List<OrderEntity> getOrderList() {
      return Arrays.asList(
              OrderEntity.builder()
                      .idOrder(UUID.fromString("7ff6dd1d-40c3-4e3b-be84-a6795afc15c6"))
                      .idCustomer(4234L)
                      .country("México")
                      .city("City")
                      .street("Street")
                      .orderTimestamp(LocalDateTime.of(2024, 2, 2, 15, 43, 54))
                      .pizzaList(getPizzaList())
                      .build(),

              OrderEntity.builder()
                      .idOrder(UUID.fromString("bf8faf9e-02b8-479a-879c-8d7f228222d0"))
                      .idCustomer(4234L)
                      .country("México")
                      .city("City")
                      .street("Street")
                      .houseNumber(342)
                      .floor(34)
                      .orderTimestamp(LocalDateTime.of(2024, 2, 2, 15, 43, 54))
                      .pizzaList(Collections.singletonList(getPizzaList().getFirst()))
                      .build()
      );
   }
}
