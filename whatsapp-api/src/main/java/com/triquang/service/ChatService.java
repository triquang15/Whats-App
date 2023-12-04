package com.triquang.service;

import java.util.List;

import com.triquang.exception.ChatException;
import com.triquang.exception.UserException;
import com.triquang.model.BaseIdClass;
import com.triquang.model.Chat;
import com.triquang.model.User;
import com.triquang.request.GroupChatRequest;

public interface ChatService {
	
	public Chat createChat(User reqUser, Integer userId) throws UserException;
	
	public Chat findChatById(Integer chatId) throws ChatException;
	
	public List<Chat> findAllChatByUserId(Integer userId) throws UserException;

	public Chat createGroup(GroupChatRequest req, User reqUser) throws UserException;

	public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException;

	public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws UserException, ChatException;

	public Chat removeGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;

	public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException;
}
