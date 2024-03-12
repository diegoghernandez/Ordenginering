package com.backend.pizzadata;

import com.backend.pizzadata.constants.IngredientType;
import com.backend.pizzadata.constants.Quantity;
import com.backend.pizzadata.constants.Size;
import com.backend.pizzadata.persistence.entity.IngredientEntity;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.persistence.entity.PizzaEntity;
import com.backend.pizzadata.persistence.entity.PizzaIngredients;
import com.backend.pizzadata.web.dto.IngredientNameDto;
import com.backend.pizzadata.web.dto.OrderDto;
import com.backend.pizzadata.web.dto.PizzaDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.*;

public final class TestDataUtil {

   private TestDataUtil() {}

   public static List<IngredientEntity> getIngredientList() {
      return List.of(
              IngredientEntity.builder()
                      .idIngredient(1)
                      .ingredientName("Pepperoni")
                      .ingredientType(IngredientType.MEAT)
                      .authorImage("Author")
                      .urlImage("/meat/peperoni/")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(2)
                      .ingredientName("Mozzarella")
                      .ingredientType(IngredientType.CHEESE)
                      .authorImage("Author")
                      .urlImage("/cheese/mozzarella")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(3)
                      .ingredientName("Pineapple")
                      .ingredientType(IngredientType.VEGETABLE)
                      .authorImage("Author")
                      .urlImage("/vegetables/pineapple")
                      .build(),

              IngredientEntity.builder()
                      .idIngredient(4)
                      .ingredientName("Ham")
                      .ingredientType(IngredientType.MEAT)
                      .authorImage("Author")
                      .urlImage("/meat/ham")
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
                 .pizzaIngredients(Set.of(
                         PizzaIngredients.builder().ingredientEntity(getIngredientList().get(0)).ingredienQuantity(Quantity.NORMAL).build(),
                         PizzaIngredients.builder().ingredientEntity(getIngredientList().get(1)).ingredienQuantity(Quantity.NORMAL).build()
                 )).build(),

         PizzaEntity.builder()
                 .idPizza(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .idOrder(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .pizzaName("Custom something 2")
                 .price(534)
                 .quantity(2)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 3, 9, 20, 10, 12))
                 .pizzaIngredients(Set.of(
                         PizzaIngredients.builder().ingredientEntity(getIngredientList().get(1)).ingredienQuantity(Quantity.NORMAL).build(),
                         PizzaIngredients.builder().ingredientEntity(getIngredientList().get(2)).ingredienQuantity(Quantity.NORMAL).build(),
                         PizzaIngredients.builder().ingredientEntity(getIngredientList().get(3)).ingredienQuantity(Quantity.NORMAL).build()
                 )).build()
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
                              List.of(new IngredientNameDto("Pepperoni", Quantity.NORMAL),
                                      new IngredientNameDto("Mozzarella" ,Quantity.NORMAL)
                              )
                      ),
                      new PizzaDto(
                              "Hawaiana",
                              Size.MEDIUM,
                              2,
                              List.of(new IngredientNameDto("Mozzarella", Quantity.NORMAL),
                                     new IngredientNameDto( "Pineapple", Quantity.NORMAL),
                                     new IngredientNameDto( "Ham", Quantity.NORMAL)
                              )
                      )
              )
      );
   }
}
