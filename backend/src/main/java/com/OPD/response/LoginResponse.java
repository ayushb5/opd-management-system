package com.OPD.response;

import com.OPD.enums.Role;

public class LoginResponse {
	private Integer id;
	private String token;
	private Role role;
	private String email;
	private String name;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public LoginResponse(Integer id, String token, Role role, String email, String name) {
		super();
		this.id = id;
		this.token = token;
		this.role = role;
		this.email = email;
		this.name = name;
	}
}
