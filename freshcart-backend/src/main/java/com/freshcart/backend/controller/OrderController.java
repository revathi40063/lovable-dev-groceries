package com.freshcart.backend.controller;

import com.freshcart.backend.dto.OrderResponse;
import com.freshcart.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

	private final OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	@PostMapping("/orders")
	public ResponseEntity<OrderResponse> placeOrder(@AuthenticationPrincipal UserDetails user) {
		return ResponseEntity.ok(orderService.placeOrder(user.getUsername()));
	}

	@GetMapping("/orders")
	public ResponseEntity<List<OrderResponse>> myOrders(@AuthenticationPrincipal UserDetails user) {
		return ResponseEntity.ok(orderService.getMyOrders(user.getUsername()));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/admin/orders")
	public ResponseEntity<List<OrderResponse>> allOrders() {
		return ResponseEntity.ok(orderService.getAllOrders());
	}
}


