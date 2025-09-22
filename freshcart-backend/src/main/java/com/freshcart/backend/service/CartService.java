package com.freshcart.backend.service;

import com.freshcart.backend.dto.AddToCartRequest;
import com.freshcart.backend.dto.CartItemResponse;
import com.freshcart.backend.dto.UpdateCartItemRequest;
import com.freshcart.backend.models.CartItem;
import com.freshcart.backend.models.Product;
import com.freshcart.backend.models.User;
import com.freshcart.backend.repository.CartItemRepository;
import com.freshcart.backend.repository.ProductRepository;
import com.freshcart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

	private final CartItemRepository cartItemRepository;
	private final ProductRepository productRepository;
	private final UserRepository userRepository;

	public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository, UserRepository userRepository) {
		this.cartItemRepository = cartItemRepository;
		this.productRepository = productRepository;
		this.userRepository = userRepository;
	}

	public List<CartItemResponse> getCart(String userEmail) {
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		return cartItemRepository.findByUser(user).stream().map(this::toResponse).collect(Collectors.toList());
	}

	public CartItemResponse addToCart(String userEmail, AddToCartRequest request) {
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		Product product = productRepository.findById(request.getProductId()).orElseThrow();
		CartItem item = CartItem.builder()
				.user(user)
				.product(product)
				.quantity(request.getQuantity())
				.build();
		return toResponse(cartItemRepository.save(item));
	}

	public CartItemResponse updateQuantity(String userEmail, Long itemId, UpdateCartItemRequest request) {
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		CartItem item = cartItemRepository.findById(itemId).orElseThrow();
		if (!item.getUser().getId().equals(user.getId())) {
			throw new IllegalArgumentException("Cannot modify others' cart");
		}
		item.setQuantity(request.getQuantity());
		return toResponse(cartItemRepository.save(item));
	}

	public void removeItem(String userEmail, Long itemId) {
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		CartItem item = cartItemRepository.findById(itemId).orElseThrow();
		if (!item.getUser().getId().equals(user.getId())) {
			throw new IllegalArgumentException("Cannot remove others' cart item");
		}
		cartItemRepository.delete(item);
	}

	private CartItemResponse toResponse(CartItem item) {
		BigDecimal price = item.getProduct().getPrice();
		BigDecimal lineTotal = price.multiply(new BigDecimal(item.getQuantity()));
		return CartItemResponse.builder()
				.id(item.getId())
				.productId(item.getProduct().getId())
				.productName(item.getProduct().getName())
				.quantity(item.getQuantity())
				.price(price)
				.lineTotal(lineTotal)
				.build();
	}
}


