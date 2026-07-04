package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResetPasswordDto {
	
	@NotBlank(message="Token is required")
	private String token;
	
	@NotBlank(message="New password is required")
	@Size(min=6,max=20,message="Password must be between 6 and 20 characters")
	private String newPassword;
	
	@NotBlank(message="Confirm password is required")
	private String confirmPassword;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public ResetPasswordDto(@NotBlank(message = "Token is required") String token,
			@NotBlank(message = "New password is required") @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters") String newPassword,
			@NotBlank(message = "Confirm password is required") String confirmPassword) {
		super();
		this.token = token;
		this.newPassword = newPassword;
		this.confirmPassword = confirmPassword;
	}

	public ResetPasswordDto() {
	}
	
	
}
