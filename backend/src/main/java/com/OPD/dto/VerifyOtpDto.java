package com.OPD.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class VerifyOtpDto {
	@NotBlank(message = "Email is required")
    @Email(message = "Enter valid email")
    private String email;

    @NotBlank(message = "OTP is required")
    private String otp;
    
    public VerifyOtpDto() {
    }

	public VerifyOtpDto(@NotBlank(message = "Email is required") @Email(message = "Enter valid email") String email,
			@NotBlank(message = "OTP is required") String otp) {
		super();
		this.email = email;
		this.otp = otp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
    
}
