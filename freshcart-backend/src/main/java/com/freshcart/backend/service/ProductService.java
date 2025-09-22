package com.freshcart.backend.service;

import com.freshcart.backend.dto.ProductRequest;
import com.freshcart.backend.dto.ProductResponse;
import com.freshcart.backend.models.Product;
import com.freshcart.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public List<ProductResponse> getAll() {
		return productRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
	}

	public ProductResponse getById(Long id) {
		return toResponse(productRepository.findById(id).orElseThrow());
	}

	public ProductResponse create(ProductRequest request) {
		Product p = toEntity(request);
		return toResponse(productRepository.save(p));
	}

	public ProductResponse update(Long id, ProductRequest request) {
		Product existing = productRepository.findById(id).orElseThrow();
		existing.setName(request.getName());
		existing.setDescription(request.getDescription());
		existing.setPrice(request.getPrice());
		existing.setStockQuantity(request.getStockQuantity());
		existing.setImageUrl(request.getImageUrl());
		return toResponse(productRepository.save(existing));
	}

	public void delete(Long id) {
		productRepository.deleteById(id);
	}

	private Product toEntity(ProductRequest r) {
		return Product.builder()
				.name(r.getName())
				.description(r.getDescription())
				.price(r.getPrice())
				.stockQuantity(r.getStockQuantity())
				.imageUrl(r.getImageUrl())
				.build();
	}

	private ProductResponse toResponse(Product p) {
		return ProductResponse.builder()
				.id(p.getId())
				.name(p.getName())
				.description(p.getDescription())
				.price(p.getPrice())
				.stockQuantity(p.getStockQuantity())
				.imageUrl(p.getImageUrl())
				.build();
	}
}


