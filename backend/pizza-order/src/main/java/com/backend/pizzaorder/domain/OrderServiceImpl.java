package com.backend.pizzaorder.domain;

import com.backend.pizzaorder.domain.service.OrderService;
import com.backend.pizzaorder.exceptions.NotAllowedException;
import com.backend.pizzaorder.persistence.entity.OrderEntity;
import com.backend.pizzaorder.persistence.entity.PizzaEntity;
import com.backend.pizzaorder.persistence.entity.PizzaIngredients;
import com.backend.pizzaorder.persistence.repository.OrderRepository;
import com.backend.pizzaorder.web.api.CustomerClient;
import com.backend.pizzaorder.web.api.IngredientClient;
import com.backend.pizzaorder.web.dto.OrderDto;
import com.backend.pizzaorder.web.dto.PizzaDto;
import feign.FeignException;
import jakarta.servlet.http.Cookie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

   private final OrderRepository orderRepository;

   private final CustomerClient customerClient;

   private final IngredientClient ingredientClient;

   public OrderServiceImpl(OrderRepository orderRepository, CustomerClient customerClient, IngredientClient ingredientClient) {
      this.orderRepository = orderRepository;
      this.customerClient = customerClient;
      this.ingredientClient = ingredientClient;
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

   private List<PizzaEntity> convertPizzaDtoToEntity(UUID idOrder, List<PizzaDto> pizzaDtoList) throws NotAllowedException {
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

         var pizzaIngredients = new HashSet<PizzaIngredients>();
         try {
            for(var ingredientNameDto : pizzaDto.pizzaIngredients()) {
               var idIngredient = ingredientClient.getIdByIngredientName(ingredientNameDto.name());
               pizzaIngredients.add(PizzaIngredients.builder()
                       .idIngredient(idIngredient)
                       .idPizza(idPizza)
                       .ingredientQuantity(ingredientNameDto.quantity())
                       .build());
            }
         } catch (FeignException e) {
            System.out.println(e.getMessage());
            throw new NotAllowedException("Ingredient doesn't exist");
         }

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
