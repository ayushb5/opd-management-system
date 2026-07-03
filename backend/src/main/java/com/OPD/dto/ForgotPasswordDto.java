package com.OPD.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ForgotPasswordDto {
	@NotBlank(message="Email is required")
	@Email(message="Enter valid email")
	private String email;

	public ForgotPasswordDto() {
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public ForgotPasswordDto(
			@NotBlank(message = "Email is required") @Email(message = "Enter valid email") String email) {
		super();
		this.email = email;
	}	
	
}
