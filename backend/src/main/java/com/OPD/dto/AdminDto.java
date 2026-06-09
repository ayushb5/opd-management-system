package com.OPD.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AdminDto {
	@NotBlank(message="Name is required")
	private String name;
	
	@NotBlank(message="Email is required")
	@Email(message="Enter valid email")
	private String email;
	
	@NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Enter valid mobile number"
    )
    private String mobileNo;
	
	@NotBlank(message = "Password is required")
    @Size(
        min = 6,
        max = 20,
        message = "Password must be between 6 and 20 characters"
    )
    private String password;
	
	public AdminDto() {
    }

	public AdminDto(String name, String email, String mobileNo, String password) {
	    this.name = name;
	    this.email = email;
	    this.mobileNo = mobileNo;
	    this.password = password;
	}

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
