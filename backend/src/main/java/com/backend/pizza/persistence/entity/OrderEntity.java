package com.backend.pizza.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_order")
public class OrderEntity {

   @Id
   @Column(name = "id_order")
   @ToString.Exclude
   private UUID idOrder;

   @Column(name = "id_customer", nullable = false)
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

   @NotNull
   private Integer total;

   @ToString.Exclude
   @Column(name = "order_timestamp", columnDefinition = "DATETIME", nullable = false)
   private LocalDateTime orderTimestamp;

   @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
   @ToString.Exclude
   private List<PizzaEntity> pizzaList;
}
