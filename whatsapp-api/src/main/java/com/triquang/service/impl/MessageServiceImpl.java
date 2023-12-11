package com.triquang.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.ChatException;
import com.triquang.exception.MessageException;
import com.triquang.exception.UserException;
import com.triquang.model.Chat;
import com.triquang.model.Message;
import com.triquang.model.User;
import com.triquang.repository.MessageRepository;
import com.triquang.request.SendMessageRequest;
import com.triquang.service.ChatService;
import com.triquang.service.MessageService;
import com.triquang.service.UserService;

@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private ChatService chatService;
	@Autowired
	private UserService userService;

	@Override
	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException {
		User user = userService.findUserById(req.getUserId());
		Chat chat = chatService.findChatById(req.getChatId());

		Message message = new Message();
		message.setChat(chat);
		message.setUser(user);
		message.setContent(req.getContent());
		message.setTimeStamp(LocalDateTime.now());

		return messageRepository.save(message);
	}

	@Override
	public List<Message> getChatMessage(Integer chatId, User reqUser) throws ChatException, UserException {
		Chat chat = chatService.findChatById(chatId);
		if (!chat.getUsers().contains(reqUser)) {
			throw new UserException("You are not releted to this chat " + chat.getId());
		}

		List<Message> messages = messageRepository.findByChatId(chat.getId());

		return messages;
	}

	@Override
	public Message findMessageById(Integer messageId) throws MessageException {
		Optional<Message> message = messageRepository.findById(messageId);
		if(message.isPresent()) {
			return message.get();
		}
		throw new MessageException("Message not found with id " + messageId);
	}

	@Override
	public void deleteMessage(Integer messageId, User reqUser) throws MessageException, UserException {
		Message message = findMessageById(messageId);
		if(message.getUser().getId().equals(reqUser.getId())) {
			messageRepository.deleteById(messageId);
		}
		throw new UserException("You can't delete another user's message " + reqUser.getFullName());
	}

}
