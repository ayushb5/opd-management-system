package com.OPD.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OPD.dto.LoginDto;
import com.OPD.services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
	@Autowired
	private AuthService service;
	
	@PostMapping("/admin/login")
	public ResponseEntity<String> adminLogin(@Valid @RequestBody LoginDto loginDto){
		String response=service.adminLogin(loginDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping("/doctor/login")
	public ResponseEntity<String> doctorLogin(@Valid @RequestBody LoginDto loginDto){
		String response=service.doctorLogin(loginDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping("/receptionist/login")
	public ResponseEntity<String> receptionistLogin(@Valid @RequestBody LoginDto loginDto){
		String response=service.receptionistLogin(loginDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
