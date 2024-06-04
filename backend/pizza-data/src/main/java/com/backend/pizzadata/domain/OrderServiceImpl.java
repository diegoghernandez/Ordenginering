package com.backend.pizzadata.domain;

import com.backend.pizzadata.domain.service.OrderService;
import com.backend.pizzadata.exceptions.NotAllowedException;
import com.backend.pizzadata.persistence.entity.OrderEntity;
import com.backend.pizzadata.persistence.entity.PizzaEntity;
import com.backend.pizzadata.persistence.entity.PizzaIngredients;
import com.backend.pizzadata.persistence.repository.IngredientRepository;
import com.backend.pizzadata.persistence.repository.OrderRepository;
import com.backend.pizzadata.web.api.CustomerClient;
import com.backend.pizzadata.web.dto.OrderDto;
import com.backend.pizzadata.web.dto.PizzaDto;
import jakarta.servlet.http.Cookie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

   private final OrderRepository orderRepository;

   private final IngredientRepository ingredientRepository;

   private final CustomerClient customerClient;

   public OrderServiceImpl(OrderRepository orderRepository, IngredientRepository ingredientRepository, CustomerClient customerClient) {
      this.orderRepository = orderRepository;
      this.ingredientRepository = ingredientRepository;
      this.customerClient = customerClient;
   }

   @Override
   public Optional<OrderEntity> getOrderById(UUID orderId) {
      return orderRepository.findById(orderId);
   }

   @Override
   public Optional<Page<OrderEntity>> getOrdersByCustomerId(long id, int page) {
      return orderRepository.findByIdCustomerOrderByOrderTimestampDesc(id,  PageRequest.of(page, 10));
   }

   @Override
   public void saveOrder(OrderDto order, Cookie cookie) throws NotAllowedException {
      var idOrder = UUID.randomUUID();

      if (customerClient.customerExist(
              order.idCustomer(),
              ResponseCookie.from(cookie.getName(), cookie.getValue()).build()
      ).status() != 200) throw new NotAllowedException("Customer not found");

      var pizzaEntityList = convertPizzaDtoToEntity(idOrder, order.pizzaList());

      var orderEntity = OrderEntity.builder()
              .idOrder(idOrder)
              .idCustomer(order.idCustomer())
              .country(order.country())
              .state(order.state())
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
         var idPizza = UUID.randomUUID();
         int price = pizzaDto.pizzaIngredients().size() * 20;

         price += switch (pizzaDto.size()) {
            case LARGE -> 150;
            case MEDIUM -> 100;
            case SMALL -> 50;
         };

         price *= pizzaDto.quantity();

         var pizzaIngredients = pizzaDto.pizzaIngredients().stream().map((ingredientNameDto) -> {
            try {
               var ingredient = ingredientRepository.findByIngredientName(ingredientNameDto.name())
                       .orElseThrow(() -> new NotAllowedException("Ingredient doesn't exist"));
               return PizzaIngredients.builder()
                       .idIngredient(ingredient.getIdIngredient())
                       .idPizza(idPizza)
                       .ingredientQuantity(ingredientNameDto.quantity())
                       .build();
            } catch (NotAllowedException e) {
               throw new RuntimeException(e);
            }
         }).collect(Collectors.toSet());

         pizzaEntityList.add(PizzaEntity.builder()
                         .idPizza(idPizza)
                         .idOrder(idOrder)
                         .pizzaName(pizzaDto.pizzaName())
                         .pizzaImageUrl(pizzaDto.pizzaImageUrl())
                         .pizzaImageAuthor(pizzaDto.pizzaImageAuthor())
                         .size(pizzaDto.size())
                         .quantity(pizzaDto.quantity())
                         .price(price)
                         .pizzaTimestamp(LocalDateTime.now())
                         .pizzaIngredients(pizzaIngredients)
                 .build()
         );
      }

      return pizzaEntityList;
   }
}
