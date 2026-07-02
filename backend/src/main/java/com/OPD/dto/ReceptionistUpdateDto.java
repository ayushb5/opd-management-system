package com.OPD.dto;

import com.OPD.entities.Receptionist;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ReceptionistUpdateDto {
	
	@NotBlank(message="Name is required")
	private String name;
	
	@Email(message="Enter valid email")
	@NotBlank(message="Email is required")
	private String email;

	
	@NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Enter valid mobile number"
    )
	private String mobileNo;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
}
