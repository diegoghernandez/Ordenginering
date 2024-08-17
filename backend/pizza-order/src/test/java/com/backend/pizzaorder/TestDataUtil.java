package com.backend.pizzaorder;

import com.backend.pizzaorder.constants.Size;
import com.backend.pizzaorder.persistence.entity.Languages;
import com.backend.pizzaorder.persistence.entity.OrderEntity;
import com.backend.pizzaorder.persistence.entity.PizzaEntity;
import com.backend.pizzaorder.persistence.entity.PizzaIngredients;
import com.backend.pizzaorder.web.dto.IngredientNameDto;
import com.backend.pizzaorder.web.dto.OrderDto;
import com.backend.pizzaorder.web.dto.PizzaDto;
import jakarta.servlet.http.Cookie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public final class TestDataUtil {

   private TestDataUtil() {}

   public static List<PizzaEntity> getPizzaList() {
      return List.of(
         PizzaEntity.builder()
                 .idPizza(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .idOrder(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .pizzaName(Languages.builder()
                         .en("Custom something 1")
                         .es("Personalizada de algo 1")
                         .build())
                 .pizzaImageName("url")
                 .pizzaImageAuthor(Languages.builder()
                         .en("author")
                         .es("autor")
                         .build())
                 .price(534)
                 .quantity(2)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 3, 9, 20, 10, 12))
                 .pizzaIngredients(Set.of(
                         PizzaIngredients.builder().idIngredient(1).ingredientQuantity(1).build(),
                         PizzaIngredients.builder().idIngredient(2).ingredientQuantity(1).build()
                 )).build(),

         PizzaEntity.builder()
                 .idPizza(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                 .idOrder(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                 .pizzaName(Languages.builder()
                         .en("Custom something 2")
                         .es("Personalizada de algo 2")
                         .build())
                 .pizzaImageName("url")
                 .pizzaImageAuthor(Languages.builder()
                         .en("author")
                         .es("autor")
                         .build())
                 .price(534)
                 .quantity(2)
                 .size(Size.LARGE)
                 .pizzaTimestamp(LocalDateTime.of(2024, 3, 9, 20, 10, 12))
                 .pizzaIngredients(Set.of(
                         PizzaIngredients.builder().idIngredient(1).ingredientQuantity(1).build(),
                         PizzaIngredients.builder().idIngredient(2).ingredientQuantity(1).build(),
                         PizzaIngredients.builder().idIngredient(3).ingredientQuantity(1).build()
                 )).build()
      );
   }

   public static Page<OrderEntity> getOrderList() {
      return new PageImpl<>(List.of(
              OrderEntity.builder()
                      .idOrder(UUID.fromString("7ff6dd1d-40c3-4e3b-be84-a6795afc15c6"))
                      .idCustomer(4234L)
                      .country("México")
                      .state("State")
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
              "State",
              "City",
              "Street",
              42342,
              null,
              null,
              List.of(
                      new PizzaDto(
                              Languages.builder()
                                      .en("Pepperoni")
                                      .es("Pepperoni")
                                      .build(),
                              "url",
                              Languages.builder()
                                      .en("author")
                                      .es("autor")
                                      .build(),
                              Size.MEDIUM,
                              1,
                              List.of(
                                    new IngredientNameDto(1, 1),
                                    new IngredientNameDto(2,1)
                              )
                      ),
                      new PizzaDto(
                              Languages.builder()
                                      .en("Hawaiana")
                                      .es("Hawaiana")
                                      .build(),
                              "url",
                              Languages.builder()
                                      .en("author")
                                      .es("autor")
                                      .build(),
                              Size.MEDIUM,
                              2,
                              List.of(
                                     new IngredientNameDto(2, 1),
                                     new IngredientNameDto( 3, 1),
                                     new IngredientNameDto( 4, 1)
                              )
                      )
              )
      );
   }

   public static Cookie getCookie() {
      return new Cookie("jwt", "token");
   }
}
