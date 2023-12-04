package com.triquang.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetail> userExceptionHandler(UserException ex, WebRequest req) {
		ErrorDetail errorDetail = new ErrorDetail(ex.getMessage(), req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetail> messageExceptionHandler(MessageException ex, WebRequest req) {
		ErrorDetail errorDetail = new ErrorDetail(ex.getMessage(), req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetail> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex, WebRequest req) {
		String error = ex.getBindingResult().getFieldError().getDefaultMessage();
		
		ErrorDetail errorDetail = new ErrorDetail("Validation Error", error, LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetail> noHandlerFoundExceptionHandler(NoHandlerFoundException ex, WebRequest req) {
		
		ErrorDetail errorDetail = new ErrorDetail("Endpoint not found", ex.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetail> otherExceptionHandler(UserException ex, WebRequest req) {
		ErrorDetail errorDetail = new ErrorDetail(ex.getMessage(), req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ErrorDetail>chatExceptionHandler(ChatException ex, WebRequest req) {
		ErrorDetail errorDetail = new ErrorDetail(ex.getMessage(), req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(errorDetail, HttpStatus.BAD_REQUEST);
	}
}
