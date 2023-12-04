package com.triquang.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.triquang.exception.UserException;
import com.triquang.model.User;
import com.triquang.repository.UserRepository;
import com.triquang.request.UpdateUserRequest;
import com.triquang.security.TokenProvider;
import com.triquang.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenProvider tokenProvider;

	@Override
	public User findUserById(Integer id) throws UserException {
		Optional<User> optional = userRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		throw new UserException("User not found with id " + id);
	}

	@Override
	public User findUserProfile(String jwt) throws UserException {
		String email = tokenProvider.getEmailFromToken(jwt);
		if (email == null) {
			throw new BadCredentialsException("Email not found with token ");

		}
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UserException("User not found with email " + email);

		}
		return user;
	}

	@Override
	public User updateUser(Integer userId, UpdateUserRequest req) throws UserException {
		User user = findUserById(userId);
		if (req.getFullName() != null) {
			user.setFullName(req.getFullName());
		}
		if (req.getImage() != null) {
			user.setImage(req.getImage());
		}
		return userRepository.save(user);
	}

	@Override
	public List<User> searchUser(String query) {
		List<User> listUsers = userRepository.searchUser(query);
		return listUsers;
	}

}
