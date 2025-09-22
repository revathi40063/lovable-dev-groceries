package com.freshcart.backend.service;

import com.freshcart.backend.dto.AuthResponse;
import com.freshcart.backend.dto.LoginRequest;
import com.freshcart.backend.dto.RegisterRequest;
import com.freshcart.backend.enums.Role;
import com.freshcart.backend.models.User;
import com.freshcart.backend.repository.UserRepository;
import com.freshcart.backend.security.jwt.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}

	public AuthResponse register(RegisterRequest request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new IllegalArgumentException("Email already registered");
		}
		User user = User.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.CUSTOMER)
				.build();
		userRepository.save(user);
		String token = jwtService.generateToken(new HashMap<>(), user.getEmail());
		return AuthResponse.builder()
				.token(token)
				.name(user.getName())
				.email(user.getEmail())
				.role(user.getRole().name())
				.build();
	}

	public AuthResponse login(LoginRequest request) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
		String token = jwtService.generateToken(new HashMap<>(), user.getEmail());
		return AuthResponse.builder()
				.token(token)
				.name(user.getName())
				.email(user.getEmail())
				.role(user.getRole().name())
				.build();
	}
}


