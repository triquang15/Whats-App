package com.triquang.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.ChatException;
import com.triquang.exception.UserException;
import com.triquang.model.Chat;
import com.triquang.model.User;
import com.triquang.repository.ChatRepository;
import com.triquang.request.GroupChatRequest;
import com.triquang.service.ChatService;
import com.triquang.service.UserService;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private UserService userService;

	@Override
	public Chat createChat(User reqUser, Integer userId) throws UserException {
		User user = userService.findUserById(userId);
		Chat isChat = chatRepository.findSingleChatByUserId(user, reqUser);

		if (isChat != null) {
			return isChat;
		}

		Chat chat = new Chat();
		chat.setCreatedBy(reqUser);
		chat.getUsers().add(user);
		chat.getUsers().add(reqUser);
		chat.setGroup(false);

		return chat;
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {
		Optional<Chat> chat = chatRepository.findById(chatId);
		if (chat.isPresent()) {
			return chat.get();
		}
		throw new ChatException("Chat not found with id " + chatId);
	}

	@Override
	public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
		User user = userService.findUserById(userId);

		List<Chat> chats = chatRepository.findChatByUserId(user.getId());

		return chats;
	}

	@Override
	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException {
		Chat chat = new Chat();
		chat.setGroup(true);
		chat.setChatImage(req.getChatImage());
		chat.setChatName(req.getChatName());
		chat.setCreatedBy(reqUser);
		chat.getAdmins().add(reqUser);

		for (Integer userId : req.getUserIds()) {
			User user = userService.findUserById(userId);
			chat.getUsers().add(user);
		}

		return chat;
	}

	@Override
	public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
		Optional<Chat> optional = chatRepository.findById(chatId);
		User user = userService.findUserById(userId);
		if (optional.isPresent()) {
			Chat chat = optional.get();
			if (chat.getAdmins().contains(reqUser)) {
				chat.getUsers().add(user);
				return chatRepository.save(chat);
			} else {
				throw new UserException("You are not admin");
			}
		}

		throw new ChatException("Chat not found with id " + chatId);
	}

	@Override
	public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws UserException, ChatException {
		Optional<Chat> optional = chatRepository.findById(chatId);
		if (optional.isPresent()) {
			Chat chat = optional.get();
			if (chat.getUsers().contains(reqUser)) {
				chat.setChatName(groupName);
				return chatRepository.save(chat);
			}
			throw new UserException("You are not member of this group");
		}
		throw new ChatException("Chat not found with id " + chatId);
	}

	@Override
	public Chat removeGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
		Optional<Chat> optional = chatRepository.findById(chatId);
		User user = userService.findUserById(userId);
		if (optional.isPresent()) {
			Chat chat = optional.get();
			if (chat.getAdmins().contains(reqUser)) {
				chat.getUsers().remove(user);
				return chatRepository.save(chat);
			} else if (chat.getUsers().contains(reqUser)) {
				if (user.getId().equals(reqUser.getId())) {
					chat.getUsers().remove(user);
					return chatRepository.save(chat);
				}
			}
			throw new UserException("You can't remove another user");

		}

		throw new ChatException("Chat not found with id " + chatId);
	}

	@Override
	public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException {
		Optional<Chat> optional = chatRepository.findById(chatId);
		if (optional.isPresent()) {
			Chat chat = optional.get();
			chatRepository.deleteById(chat.getId());
		}
	}

}
