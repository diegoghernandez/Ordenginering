package com.backend.pizza.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_order")
public class OrderEntity {

   @Id
   @Column(name = "id_order")
   private UUID idOrder;

   @Column(name = "id_customer")
   private Long idCustomer;

   @NotNull
   private String country;

   @NotNull
   private String city;

   @NotNull
   private String street;

   @Column(name = "house_number", nullable = false)
   private Integer houseNumber;

   private Integer apartment;

   private Integer floor;

   @Column(name = "order_timestamp", nullable = false, columnDefinition = "DATETIME")
   private LocalDateTime orderTimestamp;

   @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
   private List<PizzaEntity> pizzaList;
}
