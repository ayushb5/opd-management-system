package com.OPD.serviceImpl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.OPD.dto.ResetPasswordDto;
import com.OPD.entities.PasswordResetToken;
import com.OPD.repository.AdminRepository;
import com.OPD.repository.DoctorRepository;
import com.OPD.repository.PasswordResetTokenRepository;
import com.OPD.repository.ReceptionistRepository;
import com.OPD.services.EmailService;
import com.OPD.services.PasswordResetTokenService;
import com.OPD.exception.BadRequestException;

@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

	@Autowired
	private PasswordResetTokenRepository repository;
	@Autowired
	private EmailService emailService;
	@Value("${app.frontend.url}")
	private String frontendUrl;
	
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private ReceptionistRepository receptionistRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional
	@Override
	public void createResetToken(String email) {
		repository.deleteByEmail(email);
		String token=UUID.randomUUID().toString();
		PasswordResetToken resetToken=new PasswordResetToken();
		
		resetToken.setEmail(email);
		resetToken.setToken(token);
		resetToken.setExpiryTime(LocalDateTime.now().plusMinutes(5));
		resetToken.setUsed(false);
		
		repository.save(resetToken);
		String resetLink = frontendUrl + "/reset-password?token=" + token;
		
		emailService.sendResetLink(email, resetLink);
	}

	@Override
	public void validateToken(String token) {
		PasswordResetToken resetToken = repository.findByToken(token).orElseThrow(()->new BadRequestException("Invalid Reset Link"));
		if(resetToken.isUsed()) {
			throw new BadRequestException("Reset link has already been used");
		}
		
		if(resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
			throw new BadRequestException("Reset link has expired");
		}
	}
	
	@Transactional
	@Override
	public void resetPassword(ResetPasswordDto dto) {
		validateToken(dto.getToken());
		PasswordResetToken resetToken=repository.findByToken(dto.getToken()).get();
		if(!dto.getNewPassword().equals(dto.getConfirmPassword())) {
			throw new BadRequestException("Passwords do not match");
		}
		String encodedPassword=passwordEncoder.encode(dto.getNewPassword());
		String email=resetToken.getEmail();
		
		adminRepository.findByEmail(email).ifPresent(admin->{
			admin.setPassword(encodedPassword);
			adminRepository.save(admin);
		});
		doctorRepository.findByEmail(email).ifPresent(doctor->{
			doctor.setPassword(encodedPassword);
			doctorRepository.save(doctor);
		});
		receptionistRepository.findByEmail(email).ifPresent(receptionist->{
			receptionist.setPassword(encodedPassword);
			receptionistRepository.save(receptionist);
		});
		
		resetToken.setUsed(true);
		repository.save(resetToken);
	}

}
