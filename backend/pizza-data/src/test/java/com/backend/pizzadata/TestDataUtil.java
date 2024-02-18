package com.backend.pizzadata;

import com.backend.pizzadata.constants.Size;
import com.backend.pizzadata.persistence.entity.CustomerEntity;
import com.backend.pizzadata.persistence.entity.IngredientEntity;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.persistence.entity.PizzaEntity;
import com.backend.pizzadata.web.dto.NecessaryValuesForChangeDto;
import com.backend.pizzadata.web.dto.OrderDto;
import com.backend.pizzadata.web.dto.PizzaDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

public final class TestDataUtil {

   private TestDataUtil() {}

   public static CustomerEntity getCustomer() {
      return CustomerEntity.builder()
              .idCustomer(4234L)
              .customerName("Customer")
              .email("random@names.com")
              .password("1234")
              .birthDate(LocalDate.of(2003, 10, 9))
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

   public static List<IngredientEntity> getIngredientList() {
      return List.of(
              IngredientEntity.builder()
                      .idIngredient(1)
                      .ingredientName("Pepperoni")
                      .authorImage("Author")
                      .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(2)
                      .ingredientName("Mozzarella")
                      .authorImage("Author")
                      .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(3)
                      .ingredientName("Pineapple")
                      .authorImage("Author")
                      .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(4)
                      .ingredientName("Ham")
                      .authorImage("Author")
                      .urlImage("https://dominos.ua/en/kyiv/pizza/pitsa-toni-peperoni/")
                      .build()
      );
   }

   public static List<PizzaEntity> getPizzaList() {
      return List.of(
         PizzaEntity.builder()
                 .idPizza(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .idOrder(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .pizzaName("Custom something 1")
                 .price(534)
                 .quantity(2)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 3, 9, 20, 10, 12))
                 .ingredientEntities(Set.of(getIngredientList().get(0), getIngredientList().get(1)))
                 .build(),

         PizzaEntity.builder()
                 .idPizza(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .idOrder(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .pizzaName("Custom something 2")
                 .price(534)
                 .quantity(2)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 3, 9, 20, 10, 12))
                 .ingredientEntities(Set.of(getIngredientList().get(1), getIngredientList().get(2), getIngredientList().get(3)))
                 .build()
      );
   }

   public static Page<OrderEntity> getOrderList() {
      return new PageImpl<>(List.of(
              OrderEntity.builder()
                      .idOrder(UUID.fromString("7ff6dd1d-40c3-4e3b-be84-a6795afc15c6"))
                      .idCustomer(4234L)
                      .country("México")
                      .city("City")
                      .street("Street")
                      .houseNumber(4324)
                      .total(98723)
                      .orderTimestamp(LocalDateTime.of(2024, 3, 9, 20, 10, 12))
                      .pizzaList(getPizzaList())
                      .build()
      ), Pageable.ofSize(1), 1);
   }

   public static OrderDto getOrderDto() {
      return new OrderDto(
              2,
              "México",
              "City",
              "Street",
              42342,
              null,
              null,
              List.of(
                      new PizzaDto(
                              "Pepperoni",
                              Size.MEDIUM,
                              1,
                              Arrays.asList(1, 2)
                      ),
                      new PizzaDto(
                              "Hawaiana",
                              Size.MEDIUM,
                              2,
                              Arrays.asList(2, 3, 4)
                      )
              )
      );
   }
}
