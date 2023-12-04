package com.triquang.service;

import java.util.List;

import com.triquang.exception.UserException;
import com.triquang.model.User;
import com.triquang.request.UpdateUserRequest;

public interface UserService {
	public User findUserById(Integer id) throws UserException;

	public User findUserProfile(String jwt) throws UserException;

	public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

	public List<User> searchUser(String query);
}
