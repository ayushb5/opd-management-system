package com.OPD.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
		public ResponseEntity<Map<String,Object>> handleResourceNotFound(ResourceNotFoundException e){
			Map<String,Object> error=new HashMap<>();
			error.put("timestamp", LocalDateTime.now());
			error.put("status", HttpStatus.NOT_FOUND.value());
			error.put("message", e.getMessage());
			
			return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex){
		Map<String,String> errors=new HashMap<>();
		
		ex.getBindingResult().getFieldErrors().forEach(error->{
			errors.put(error.getField(), error.getDefaultMessage());
		});
		
		return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
	}
}