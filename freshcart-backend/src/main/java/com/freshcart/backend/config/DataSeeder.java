package com.freshcart.backend.config;

import com.freshcart.backend.enums.Role;
import com.freshcart.backend.models.Product;
import com.freshcart.backend.models.User;
import com.freshcart.backend.repository.ProductRepository;
import com.freshcart.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

	@Bean
	CommandLineRunner initData(ProductRepository productRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (productRepository.count() == 0) {
				List<Product> products = List.of(
						Product.builder().name("Apples").description("Fresh red apples").price(new BigDecimal("2.99")).stockQuantity(100).imageUrl("/images/apples.jpg").build(),
						Product.builder().name("Bananas").description("Organic bananas").price(new BigDecimal("1.49")).stockQuantity(120).imageUrl("/images/bananas.jpg").build(),
						Product.builder().name("Carrots").description("Crunchy carrots").price(new BigDecimal("0.99")).stockQuantity(200).imageUrl("/images/carrots.jpg").build(),
						Product.builder().name("Tomatoes").description("Vine tomatoes").price(new BigDecimal("1.99")).stockQuantity(150).imageUrl("/images/tomatoes.jpg").build(),
						Product.builder().name("Milk").description("Dairy milk 1L").price(new BigDecimal("0.89")).stockQuantity(80).imageUrl("/images/milk.jpg").build()
				);
				productRepository.saveAll(products);
			}
			if (userRepository.count() == 0) {
				User admin = User.builder()
						.name("Admin")
						.email("admin@freshcart.local")
						.password(passwordEncoder.encode("admin123"))
						.role(Role.ADMIN)
						.build();
				userRepository.save(admin);
			}
		};
	}
}


