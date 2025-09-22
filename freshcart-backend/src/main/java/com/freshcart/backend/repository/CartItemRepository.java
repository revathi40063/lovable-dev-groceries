package com.freshcart.backend.repository;

import com.freshcart.backend.models.CartItem;
import com.freshcart.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByUser(User user);
}


