package com.triquang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@SpringBootApplication
public class WhatsappApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhatsappApiApplication.class, args);
	}

}
