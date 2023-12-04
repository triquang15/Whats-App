package com.triquang.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Message extends BaseIdClass {
	
	private String content;
	private LocalDateTime timeStamp;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "chat_id")
	private Chat chat;
}
