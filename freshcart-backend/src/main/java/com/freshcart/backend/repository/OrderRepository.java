package com.freshcart.backend.repository;

import com.freshcart.backend.models.Order;
import com.freshcart.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUser(User user);
}


