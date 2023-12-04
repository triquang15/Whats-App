package com.triquang.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.ChatException;
import com.triquang.exception.UserException;
import com.triquang.model.Chat;
import com.triquang.model.User;
import com.triquang.request.GroupChatRequest;
import com.triquang.request.SingleChatRequest;
import com.triquang.response.ApiResponse;
import com.triquang.service.ChatService;
import com.triquang.service.UserService;

@RestController
@RequestMapping("/api/chats")
public class ChatController {
	@Autowired
	private ChatService chatService;
	@Autowired
	private UserService userService;

	@PostMapping("/single")
	public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatRequest singleChat,
			@RequestHeader("Authorization") String token) throws UserException {
		User reqUser = userService.findUserProfile(token);
		Chat chat = chatService.createChat(reqUser, singleChat.getUserId());

		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@PostMapping("/group")
	public ResponseEntity<Chat> createGroupChatHandler(@RequestBody GroupChatRequest groupChat,
			@RequestHeader("Authorization") String token) throws UserException {
		User reqUser = userService.findUserProfile(token);
		Chat chat = chatService.createGroup(groupChat, reqUser);

		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@GetMapping("/{chatId}")
	public ResponseEntity<Chat> findChatByIdHandler(@PathVariable Integer chatId) throws UserException, ChatException {

		Chat chat = chatService.findChatById(chatId);

		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Chat>> findAllChatByUserIdHandler(@RequestHeader("Authorization") String token)
			throws UserException {

		User reqUser = userService.findUserProfile(token);
		List<Chat> chat = chatService.findAllChatByUserId(reqUser.getId());

		return new ResponseEntity<List<Chat>>(chat, HttpStatus.OK);
	}

	@PutMapping("/{chatId}/add/{userId}")
	public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId,
			@RequestHeader("Authorization") String token) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(token);
		Chat chat = chatService.addUserToGroup(userId, chatId, reqUser);

		return new ResponseEntity<>(chat, HttpStatus.OK);
	}

	@PutMapping("/{chatId}/remove/{userId}")
	public ResponseEntity<Chat> removeUserHandler(@PathVariable Integer chatId, @PathVariable Integer userId,
			@RequestHeader("Authorization") String token) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(token);
		Chat chat = chatService.removeGroup(chatId, userId, reqUser);
		return new ResponseEntity<>(chat, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{chatId}")
	public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String token) throws UserException, ChatException {

		User reqUser = userService.findUserProfile(token);
		chatService.deleteChat(chatId, reqUser.getId());

		ApiResponse response = new ApiResponse("Chat is deleted successfully", true);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
