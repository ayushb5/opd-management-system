package com.OPD.entities;

import java.time.LocalDateTime;

import com.OPD.enums.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private String email;
	private String mobileno;
	private String password;
	private String token;
	@Enumerated(EnumType.STRING)
	private Role role;
	private LocalDateTime created_at;
	private LocalDateTime updated_at;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public LocalDateTime getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	
	public Admin(int id, String name, String email, String mobileno, String password, String token, Role role,
			LocalDateTime created_at, LocalDateTime updated_at) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.mobileno = mobileno;
		this.password = password;
		this.token = token;
		this.role = role;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
	
	@Override
	public String toString() {
		return "Admin [id=" + id + ", name=" + name + ", email=" + email + ", mobileno=" + mobileno + ", password="
				+ password + ", token=" + token + ", role=" + role + ", created_at=" + created_at + ", updated_at="
				+ updated_at + "]";
	}
	public Admin() {
		super();
	}
	
	
}
