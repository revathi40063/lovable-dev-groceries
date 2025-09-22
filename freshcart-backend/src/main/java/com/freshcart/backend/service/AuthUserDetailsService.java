package com.freshcart.backend.service;

import com.freshcart.backend.models.User;
import com.freshcart.backend.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	public AuthUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return new org.springframework.security.core.userdetails.User(
				user.getEmail(),
				user.getPassword(),
				List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
		);
	}
}


