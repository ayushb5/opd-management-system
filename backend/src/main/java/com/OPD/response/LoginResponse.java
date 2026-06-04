package com.OPD.response;

import com.OPD.enums.Role;

public class LoginResponse {
	private String token;
	private Role role;
	private String email;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public LoginResponse(String token, Role role, String email) {
		super();
		this.token = token;
		this.role = role;
		this.email = email;
	}
}
