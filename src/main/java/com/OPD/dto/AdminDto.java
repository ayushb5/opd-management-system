package com.OPD.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AdminDto {
	@NotBlank(message="Name is required")
	private String name;
	
	@Email(message="Enter valid email")
	@NotBlank(message="Email is required")
	private String email;
	
	@NotBlank(message="Mobile number is required")
	private String mobileno;
	
	@NotBlank(message="Password is required")
	@Size(min=6,message="Password must be at least 6 characters")
	private String password;
	
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
	public String getMobileno() {
		return mobileno;
	}
	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public AdminDto(String name, String email, String mobileno, String password) {
		super();
		this.name = name;
		this.email = email;
		this.mobileno = mobileno;
		this.password = password;
	}
	
	public AdminDto() {
	}
	
	
}
