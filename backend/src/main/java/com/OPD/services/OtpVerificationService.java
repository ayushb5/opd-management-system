package com.OPD.services;

public interface OtpVerificationService {
	void generateAndSendOtp(String email);
	void verifyOtp(String email,String otp);
}
