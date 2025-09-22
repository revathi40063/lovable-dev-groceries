package com.freshcart.backend.controller;

import com.freshcart.backend.dto.AddToCartRequest;
import com.freshcart.backend.dto.CartItemResponse;
import com.freshcart.backend.dto.UpdateCartItemRequest;
import com.freshcart.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

	private final CartService cartService;

	public CartController(CartService cartService) {
		this.cartService = cartService;
	}

	@GetMapping
	public ResponseEntity<List<CartItemResponse>> getCart(@AuthenticationPrincipal UserDetails user) {
		return ResponseEntity.ok(cartService.getCart(user.getUsername()));
	}

	@PostMapping("/add")
	public ResponseEntity<CartItemResponse> add(@AuthenticationPrincipal UserDetails user, @Valid @RequestBody AddToCartRequest request) {
		return ResponseEntity.ok(cartService.addToCart(user.getUsername(), request));
	}

	@PutMapping("/update/{itemId}")
	public ResponseEntity<CartItemResponse> update(@AuthenticationPrincipal UserDetails user, @PathVariable Long itemId, @Valid @RequestBody UpdateCartItemRequest request) {
		return ResponseEntity.ok(cartService.updateQuantity(user.getUsername(), itemId, request));
	}

	@DeleteMapping("/remove/{itemId}")
	public ResponseEntity<Void> remove(@AuthenticationPrincipal UserDetails user, @PathVariable Long itemId) {
		cartService.removeItem(user.getUsername(), itemId);
		return ResponseEntity.noContent().build();
	}
}


