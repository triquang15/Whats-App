package com.triquang.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Chat extends BaseIdClass {
	private String chatName;
	private String chatImage;
	
	@Column(name = "isGroup")
	private boolean isGroup;
	
	@JoinColumn(name = "createdBy")
	@ManyToOne
	private User createdBy;
	
	@ManyToMany
	private Set<User> users = new HashSet<>();
	
	@OneToMany
	private List<Message> messages = new ArrayList<>();
	
	@ManyToMany
	private Set<User> admins = new HashSet<>();
}
