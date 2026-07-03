package com.OPD.services;

public interface EmailService {
	void sendOtp(String to, String otp);
	void sendResetLink(String to, String resetLink);
}
