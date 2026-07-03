package com.OPD.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.OPD.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	public void sendOtp(String to, String otp) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(to);
		message.setSubject("City Care Hospital - OTP Verification");
		message.setText("Dear User,\n\n"
					+ "Your OTP is: "+otp+"\n\n"
					+ "It is valid for 5 minutes.\n\n"
					+ "Regards,\n"
					+ "City Care Hospital"
				);
		
		mailSender.send(message);
	}

	@Override
	public void sendResetLink(String to, String resetLink) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(to);
		message.setSubject("City Care Hospital - Password Reset");
		message.setText("Dear User,\n\n"
				+ "We receive a request to reset your password.\n\n"
				+ "Click the link below to reset your password:\n\n"
				+ resetLink
				+"\n\n"
				+ "This link will expire in 15 minutes.\n\n"
				+ "If you didn't request this, you can safely ignore this email.\n\n"
				+ "Regards,\n"
				+ "City Care Hospital");
		mailSender.send(message);
	}

}
