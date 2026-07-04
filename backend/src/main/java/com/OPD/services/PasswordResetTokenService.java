package com.OPD.services;

import com.OPD.dto.ResetPasswordDto;

public interface PasswordResetTokenService {
	void createResetToken(String email);
	void validateToken(String token);
	void resetPassword(ResetPasswordDto dto);
}
