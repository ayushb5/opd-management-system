package com.OPD.services;

public interface PasswordResetTokenService {
	void createResetToken(String email);
	void validateToken(String token);
//	void resetPassword(ResetPasswordDto dto);
}
