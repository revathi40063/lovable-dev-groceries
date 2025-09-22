package com.freshcart.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddToCartRequest {
	@NotNull
	private Long productId;

	@NotNull
	@Min(1)
	private Integer quantity;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartItemRequest {
	@NotNull
	@Min(1)
	private Integer quantity;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {
	private Long id;
	private Long productId;
	private String productName;
	private Integer quantity;
	private BigDecimal price;
	private BigDecimal lineTotal;
}


