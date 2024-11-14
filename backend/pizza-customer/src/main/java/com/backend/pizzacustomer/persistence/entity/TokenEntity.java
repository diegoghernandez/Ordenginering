package com.backend.pizzacustomer.persistence.entity;

import com.backend.pizzacustomer.constants.TokenType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "token")
public class TokenEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "id_token")
   private UUID idToken;

   @Column(name = "id_customer", nullable = false)
   private Long idCustomer;

   @Enumerated(EnumType.STRING)
   @Column(name = "token_type", nullable = false)
   private TokenType tokenType;

   @Column(name = "expiration_time", nullable = false)
   private LocalDateTime expirationTime;
}
