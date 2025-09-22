package com.freshcart.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {
	@NotBlank
	@Size(min = 2, max = 255)
	private String name;

	private String description;

	@NotNull
	@DecimalMin("0.0")
	private BigDecimal price;

	@NotNull
	@Min(0)
	private Integer stockQuantity;

	private String imageUrl;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
	private Long id;
	private String name;
	private String description;
	private BigDecimal price;
	private Integer stockQuantity;
	private String imageUrl;
}


