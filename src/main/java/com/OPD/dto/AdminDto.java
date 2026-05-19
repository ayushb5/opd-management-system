package com.OPD.dto;

public class AdminDto {
	private String name;
	private String email;
	private String mobileno;
	private String password;
	private String token;
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
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public AdminDto(String name, String email, String mobileno, String password, String token) {
		super();
		this.name = name;
		this.email = email;
		this.mobileno = mobileno;
		this.password = password;
		this.token = token;
	}
	public AdminDto() {
	}
	
	
}
