package com.triquang.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.UserException;
import com.triquang.model.User;
import com.triquang.request.UpdateUserRequest;
import com.triquang.response.ApiResponse;
import com.triquang.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
		User user = userService.findUserProfile(token);
		
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<User>> searchUserHandler(@RequestParam("keyword") String q){
		List<User> listUsers = userService.searchUser(q);
		
		return new ResponseEntity<List<User>>(listUsers, HttpStatus.OK);
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest req, @RequestHeader("Authorization") String token) throws UserException {
		User user = userService.findUserProfile(token);
		userService.updateUser(user.getId(), req);
		
		ApiResponse  response = new ApiResponse("User updated successfully", true);
		
		return new ResponseEntity<ApiResponse>(response, HttpStatus.ACCEPTED);
		
	}
}
