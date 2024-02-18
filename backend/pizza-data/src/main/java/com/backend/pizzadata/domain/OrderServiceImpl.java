package com.backend.pizzadata.domain;

import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.persistence.entity.PizzaEntity;
import com.backend.pizzadata.persistence.repository.IngredientRepository;
import com.backend.pizzadata.persistence.repository.OrderRepository;
import com.backend.pizzadata.web.dto.OrderDto;
import com.backend.pizzadata.web.dto.PizzaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

   private final OrderRepository orderRepository;

   private final IngredientRepository ingredientRepository;

   @Autowired
   public OrderServiceImpl(OrderRepository orderRepository, IngredientRepository ingredientRepository) {
      this.orderRepository = orderRepository;
      this.ingredientRepository = ingredientRepository;
   }

   @Override
   public Optional<Page<OrderEntity>> getOrdersByAccount(long id, int page) {
      return orderRepository.findByIdCustomer(id,  PageRequest.of(page, 5));
   }

   @Override
   public void saveOrder(OrderDto order) {
      var idOrder = UUID.randomUUID();
      var pizzaEntityList = convertPizzaDtoToEntity(idOrder, order.pizzaList());

      var orderEntity = OrderEntity.builder()
              .idOrder(idOrder)
              .idCustomer(order.idCustomer())
              .country(order.country())
              .city(order.city())
              .street(order.street())
              .houseNumber(order.houseNumber())
              .apartment(order.apartment())
              .floor(order.floor())
              .total(pizzaEntityList.stream().map(PizzaEntity::getPrice).reduce(0, Integer::sum))
              .orderTimestamp(LocalDateTime.now())
              .pizzaList(pizzaEntityList)
              .build();

      orderRepository.save(orderEntity);
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

         var pizzaIngredients = pizzaDto.ingredientIdList().stream().map((id) -> {
            try {
               return ingredientRepository.findById(id).orElseThrow(() -> new NotAllowedException("Ingredient doesn't exist"));
            } catch (NotAllowedException e) {
               throw new RuntimeException(e);
            }
         }).collect(Collectors.toSet());

         pizzaEntityList.add(PizzaEntity.builder()
                         .idOrder(idOrder)
                         .pizzaName(pizzaDto.pizzaName())
                         .size(pizzaDto.size())
                         .quantity(pizzaDto.quantity())
                         .ingredientEntities(pizzaIngredients)
                         .price(price)
                         .pizzaTimestamp(LocalDateTime.now())
                 .build()
         );
      }

      return pizzaEntityList;
   }
}
