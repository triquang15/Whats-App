package com.triquang.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupChatRequest {
	private List<Integer> userIds;
	private String chatName;
	private String chatImage;
	
}
