package com.backend.pizzadata.web.domain;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrderDomain(
   UUID orderId,
   LocalDateTime orderTimestamp,
   int totalProducts,
   int total
) {}
