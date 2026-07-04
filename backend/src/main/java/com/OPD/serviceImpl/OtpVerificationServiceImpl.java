package com.OPD.serviceImpl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.OPD.entities.OtpVerification;
import com.OPD.repository.OtpVerificationRepository;
import com.OPD.services.EmailService;
import com.OPD.services.OtpVerificationService;
import com.OPD.utils.OtpGenerator;
import com.OPD.exception.BadRequestException;

@Service
public class OtpVerificationServiceImpl implements OtpVerificationService {
	
	@Autowired
	private OtpVerificationRepository repository;
	@Autowired
	private EmailService emailService;

	@Transactional
	@Override
	public void generateAndSendOtp(String email) {
		repository.deleteByEmail(email);
		String otp = OtpGenerator.generateOtp();
		OtpVerification otpVerification = new OtpVerification();
		otpVerification.setEmail(email);
		otpVerification.setOtp(otp);
		otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
		otpVerification.setVerified(false);
		
		repository.save(otpVerification);
		emailService.sendOtp(email, otp);
	}

	@Transactional
	@Override
	public void verifyOtp(String email, String otp) {
		OtpVerification otpVerification=repository.findByEmail(email).orElseThrow(()->new BadRequestException("OTP not found"));
		if(otpVerification.isVerified()) {
			throw new BadRequestException("OTP has already been used");
		}
		if(otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
			throw new BadRequestException("OTP has expired");
		}
		if(!otpVerification.getOtp().equals(otp)) {
			throw new BadRequestException("Invalid OTP");
		}
		
		otpVerification.setVerified(true);
		repository.save(otpVerification);
	}

}
