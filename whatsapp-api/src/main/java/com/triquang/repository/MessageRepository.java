package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.triquang.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {
	
	@Query("SELECT m FROM Message m JOIN m.chat c WHERE c.id = :chatId")
	public List<Message> findByChatId(@Param("chatId") Integer chatId);

}
