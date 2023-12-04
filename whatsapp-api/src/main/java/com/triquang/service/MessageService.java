package com.triquang.service;

import java.util.List;

import com.triquang.exception.ChatException;
import com.triquang.exception.MessageException;
import com.triquang.exception.UserException;
import com.triquang.model.Message;
import com.triquang.model.User;
import com.triquang.request.SendMessageRequest;

public interface MessageService {
	public Message sendMessage(SendMessageRequest req) throws UserException, ChatException;

	public List<Message> getChatMessage(Integer chatId, User reqUser) throws ChatException, UserException;

	public Message findMessageById(Integer messageId) throws MessageException;

	public void deleteMessage(Integer messageId, User reqUser) throws MessageException, UserException;
}
