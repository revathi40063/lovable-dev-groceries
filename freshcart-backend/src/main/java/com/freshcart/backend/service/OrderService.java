package com.freshcart.backend.service;

import com.freshcart.backend.dto.OrderItemResponse;
import com.freshcart.backend.dto.OrderResponse;
import com.freshcart.backend.enums.OrderStatus;
import com.freshcart.backend.models.CartItem;
import com.freshcart.backend.models.Order;
import com.freshcart.backend.models.OrderItem;
import com.freshcart.backend.models.User;
import com.freshcart.backend.repository.CartItemRepository;
import com.freshcart.backend.repository.OrderRepository;
import com.freshcart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

	private final OrderRepository orderRepository;
	private final CartItemRepository cartItemRepository;
	private final UserRepository userRepository;

	public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository, UserRepository userRepository) {
		this.orderRepository = orderRepository;
		this.cartItemRepository = cartItemRepository;
		this.userRepository = userRepository;
	}

	public OrderResponse placeOrder(String userEmail) {
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		List<CartItem> cartItems = cartItemRepository.findByUser(user);
		if (cartItems.isEmpty()) {
			throw new IllegalStateException("Cart is empty");
		}
		Order order = new Order();
		order.setUser(user);
		order.setStatus(OrderStatus.PENDING);
		BigDecimal total = BigDecimal.ZERO;
		for (CartItem ci : cartItems) {
			OrderItem oi = new OrderItem();
			oi.setOrder(order);
			oi.setProduct(ci.getProduct());
			oi.setQuantity(ci.getQuantity());
			oi.setPrice(ci.getProduct().getPrice());
			order.getItems().add(oi);
			total = total.add(ci.getProduct().getPrice().multiply(new BigDecimal(ci.getQuantity())));
		}
		order.setTotalAmount(total);
		Order saved = orderRepository.save(order);
		// clear cart
		cartItemRepository.deleteAll(cartItems);
		return toResponse(saved);
	}

	public List<OrderResponse> getMyOrders(String userEmail) {
		User user = userRepository.findByEmail(userEmail).orElseThrow();
		return orderRepository.findByUser(user).stream().map(this::toResponse).collect(Collectors.toList());
	}

	public List<OrderResponse> getAllOrders() {
		return orderRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
	}

	private OrderResponse toResponse(Order order) {
		return OrderResponse.builder()
				.id(order.getId())
				.totalAmount(order.getTotalAmount())
				.status(order.getStatus())
				.createdAt(order.getCreatedAt())
				.items(order.getItems().stream().map(oi -> OrderItemResponse.builder()
						.productId(oi.getProduct().getId())
						.productName(oi.getProduct().getName())
						.quantity(oi.getQuantity())
						.price(oi.getPrice())
						.build()).collect(Collectors.toList()))
				.build();
	}
}


