package com.OPD.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.OPD.dto.ForgotPasswordDto;
import com.OPD.dto.LoginDto;
import com.OPD.dto.ResetPasswordDto;
import com.OPD.dto.VerifyOtpDto;
import com.OPD.repository.AdminRepository;
import com.OPD.repository.DoctorRepository;
import com.OPD.repository.ReceptionistRepository;
import com.OPD.response.LoginOtpResponse;
import com.OPD.response.LoginResponse;
import com.OPD.services.AuthService;
import com.OPD.services.OtpVerificationService;
import com.OPD.services.PasswordResetTokenService;
import com.OPD.exception.BadRequestException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
	@Autowired
	private AuthService service;
	
	@Autowired
	private OtpVerificationService otpVerificationService;
	@Autowired
	private PasswordResetTokenService passwordResetTokenService;
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private ReceptionistRepository receptionistRepository;
	
	@PostMapping("/login")
	public ResponseEntity<LoginOtpResponse> login(@Valid @RequestBody LoginDto loginDto){
		LoginOtpResponse response=service.login(loginDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<Map<String, String>> forgotPassword(@Valid @RequestBody ForgotPasswordDto forgotPasswordDto){
		String email=forgotPasswordDto.getEmail();
		
		boolean userExist=adminRepository.findByEmail(email).isPresent()
				|| doctorRepository.findByEmail(email).isPresent()
				|| receptionistRepository.findByEmail(email).isPresent();
		
		if(!userExist) {
			throw new BadRequestException("No account found with this email");
		}
		
		passwordResetTokenService.createResetToken(email);
		
		Map<String,String> response=new HashMap<>();
		response.put("message", "Password reset link sent successfully");
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/validate-reset-token")
	public ResponseEntity<Map<String, String>> validateResetToken(@RequestParam String token){
		passwordResetTokenService.validateToken(token);
		Map<String, String> response = new HashMap<>();
	    response.put("message", "Token is valid");
	    return ResponseEntity.ok(response);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<Map<String,String>> resetPassword(@Valid @RequestBody ResetPasswordDto dto){
		passwordResetTokenService.resetPassword(dto);
		
		Map<String,String> response=new HashMap<>();
		response.put("message", "Password reset successfully");
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/verify-otp")
	public ResponseEntity<LoginResponse> verifyOtp(@Valid @RequestBody VerifyOtpDto dto){
		LoginResponse response=service.verifyOtp(dto);
		return ResponseEntity.ok(response);
	}
	
//	@PostMapping("/admin/login")
//	public ResponseEntity<LoginResponse> adminLogin(@Valid @RequestBody LoginDto loginDto){
//		LoginResponse response=service.adminLogin(loginDto);
//		return new ResponseEntity<>(response,HttpStatus.OK);
//	}
//	
//	@PostMapping("/doctor/login")
//	public ResponseEntity<LoginResponse> doctorLogin(@Valid @RequestBody LoginDto loginDto){
//		LoginResponse response=service.doctorLogin(loginDto);
//		return new ResponseEntity<>(response,HttpStatus.OK);
//	}
//	
//	@PostMapping("/receptionist/login")
//	public ResponseEntity<LoginResponse> receptionistLogin(@Valid @RequestBody LoginDto loginDto){
//		LoginResponse response=service.receptionistLogin(loginDto);
//		return new ResponseEntity<>(response,HttpStatus.OK);
//	}
}
