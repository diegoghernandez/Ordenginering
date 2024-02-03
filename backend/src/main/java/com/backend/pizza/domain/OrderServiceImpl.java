package com.backend.pizza.domain;

import com.backend.pizza.constants.Size;
import com.backend.pizza.domain.service.OrderService;
import com.backend.pizza.persistence.entity.OrderEntity;
import com.backend.pizza.persistence.entity.PizzaEntity;
import com.backend.pizza.web.dto.OrderDto;
import com.backend.pizza.web.dto.PizzaDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

   @Override
   public List<OrderEntity> getOrdersByAccount(long id) {
      return List.of(
              OrderEntity.builder()
                      .idOrder(UUID.fromString("7ff6dd1d-40c3-4e3b-be84-a6795afc15c6"))
                      .idCustomer(4234L)
                      .country("México")
                      .city("City")
                      .street("Street")
                      .orderTimestamp(LocalDateTime.of(2024, 2, 2, 15, 43, 54))
                      .pizzaList(Arrays.asList(
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
                      ))
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
                      .pizzaList(Collections.singletonList(
                              PizzaEntity.builder()
                                      .idPizza(UUID.fromString("357f77a9-fe2a-4492-a85f-50612355c6ad"))
                                      .idOrder(UUID.fromString("93fa6a20-cf6d-4443-9056-4614567b39b8"))
                                      .pizzaName("custom")
                                      .price(3123)
                                      .size(Size.LARGE)
                                      .pizzaTimestamp(LocalDateTime.of(2024, 2, 2, 12, 23, 43))
                                      .build()
                      ))
                      .build()
      );
   }

   @Override
   public void saveOrder(OrderDto order) {
      var orderId = UUID.randomUUID();

      var pizzaEntityList = convertPizzaDtoToEntity(orderId, order.pizzaDtoList());

      var orderEntity = OrderEntity.builder()
              .idOrder(orderId)
              .country(order.country())
              .city(order.city())
              .street(order.street())
              .houseNumber(order.houseNumber())
              .apartment(order.apartment())
              .floor(order.floor())
              .total(pizzaEntityList.stream().map(PizzaEntity::getPrice).reduce(0, Integer::sum))
              .pizzaList(pizzaEntityList)
              .build();

   }

   private List<PizzaEntity> convertPizzaDtoToEntity(UUID idOrder, List<PizzaDto> pizzaDtoList) {
      var pizzaEntityList = new ArrayList<PizzaEntity>();

      for (var pizzaDto : pizzaDtoList) {
         int price = pizzaDto.ingredientIdList().size() * 20;

         price += switch (pizzaDto.size()) {
            case LARGE -> 150;
            case MEDIUM -> 100;
            case SMALL -> 50;
         };

         price *= pizzaDto.quantity();

         pizzaEntityList.add(PizzaEntity.builder()
                         .idPizza(pizzaDto.idPizza())
                         .idOrder(idOrder)
                         .pizzaName(pizzaDto.pizzaName())
                         .size(pizzaDto.size())
                         .quantity(pizzaDto.quantity())
                         .price(price)
                 .build()
         );
      }

      return pizzaEntityList;
   }
}
