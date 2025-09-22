package com.freshcart.backend.dto;

import com.freshcart.backend.enums.OrderStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {
	private Long productId;
	private String productName;
	private Integer quantity;
	private BigDecimal price;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
	private Long id;
	private BigDecimal totalAmount;
	private OrderStatus status;
	private Instant createdAt;
	private List<OrderItemResponse> items;
}


