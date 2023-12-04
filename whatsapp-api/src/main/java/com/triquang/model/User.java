package com.triquang.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User extends BaseIdClass {
	private String fullName;
	private String email;
	private String image;
	private String password;
	
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	private List<Notification> notifications = new ArrayList<>();
	
}
