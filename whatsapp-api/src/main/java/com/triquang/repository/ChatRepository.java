package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.triquang.model.BaseIdClass;
import com.triquang.model.Chat;
import com.triquang.model.User;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
	
	@Query("SELECT c FROM Chat c WHERE c.isGroup=false AND :user MEMBER OF c.users AND :reqUser MEMBER OF c.users")
	public Chat findSingleChatByUserId(@Param("user") User user, @Param("reqUser")User reqUser);
	
	@Query("SELECT c FROM Chat c JOIN c.users u WHERE u.id = :userId")
	public List<Chat> findChatByUserId(@Param("userId") Integer userId);
}
