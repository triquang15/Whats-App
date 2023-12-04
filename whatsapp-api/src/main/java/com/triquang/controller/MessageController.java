package com.triquang.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.ChatException;
import com.triquang.exception.MessageException;
import com.triquang.exception.UserException;
import com.triquang.model.Message;
import com.triquang.model.User;
import com.triquang.request.SendMessageRequest;
import com.triquang.response.ApiResponse;
import com.triquang.service.MessageService;
import com.triquang.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
	@Autowired
	private MessageService messageService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest req,
			@RequestHeader("Authorization") String token) throws UserException, ChatException {

		User user = userService.findUserProfile(token);
		req.setUserId(user.getId());
		Message message = messageService.sendMessage(req);

		return new ResponseEntity<Message>(message, HttpStatus.OK);
	}

	@GetMapping("/chat/{chatId}")
	public ResponseEntity<List<Message>> getMessageHandler(@PathVariable Integer chatId,
			@RequestHeader("Authorization") String token) throws UserException, ChatException {

		User user = userService.findUserProfile(token);
		List<Message> listMessages = messageService.getChatMessage(chatId, user);

		return new ResponseEntity<>(listMessages, HttpStatus.OK);
	}

	@DeleteMapping("/{messageId}")
	public ResponseEntity<ApiResponse> deleteChatMessageHandler(@PathVariable Integer messageId,
			@RequestHeader("Authorization") String token) throws UserException, ChatException, MessageException {

		User user = userService.findUserProfile(token);
		messageService.deleteMessage(messageId, user);
		ApiResponse response = new ApiResponse("Message deleted successsfully", true);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
