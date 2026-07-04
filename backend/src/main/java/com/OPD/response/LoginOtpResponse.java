package com.OPD.response;

import com.OPD.enums.Role;

public class LoginOtpResponse {
	private Integer id;
	private Role role;
	private String email;
	private String name;
	private String message;
	
	public LoginOtpResponse() {
	}

	public LoginOtpResponse(Integer id, Role role, String email, String name, String message) {
		super();
		this.id = id;
		this.role = role;
		this.email = email;
		this.name = name;
		this.message = message;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
