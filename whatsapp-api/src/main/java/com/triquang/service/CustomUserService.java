package com.triquang.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.triquang.model.User;
import com.triquang.repository.UserRepository;

@Service
public class CustomUserService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User findByEmail = userRepository.findByEmail(username);
		if(findByEmail == null) {
			throw new UsernameNotFoundException("User not found with username "  + username);
		}
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		return new org.springframework.security.core.userdetails.User(findByEmail.getEmail(), findByEmail.getPassword(),authorities);
	}

}
