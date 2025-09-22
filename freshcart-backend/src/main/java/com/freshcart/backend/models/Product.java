package com.freshcart.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(min = 2, max = 255)
	private String name;

	@Column(length = 2000)
	private String description;

	@NotNull
	@DecimalMin("0.0")
	private BigDecimal price;

	@NotNull
	@Min(0)
	private Integer stockQuantity;

	private String imageUrl;
}


