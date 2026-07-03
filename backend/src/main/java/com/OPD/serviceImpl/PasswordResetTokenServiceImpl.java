package com.OPD.serviceImpl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.OPD.entities.PasswordResetToken;
import com.OPD.repository.PasswordResetTokenRepository;
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

}
