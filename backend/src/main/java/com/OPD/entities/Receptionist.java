package com.OPD.entities;

import java.time.LocalDateTime;

import com.OPD.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
@Entity
public class Receptionist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	private String name;
	@Column(unique = true)
	private String email;
	@JsonIgnore
	private String password;
	private String mobileno;
	public enum Status{
		ACTIVE,
		INACTIVE
	}
	
	@Enumerated(EnumType.STRING)
	private Status status;
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
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileno() {
		return mobileno;
	}
	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
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
	public Receptionist(int id, Doctor doctor, String name, String email, String password, String mobileno,
			Status status, Role role, LocalDateTime created_at, LocalDateTime updated_at) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.name = name;
		this.email = email;
		this.password = password;
		this.mobileno = mobileno;
		this.status = status;
		this.role = role;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
	@Override
	public String toString() {
		return "Receptionist [id=" + id + ", doctor=" + doctor + ", name=" + name + ", email=" + email + ", password="
				+ password + ", mobileno=" + mobileno + ", status=" + status + ", role=" + role + ", created_at="
				+ created_at + ", updated_at=" + updated_at + "]";
	}
	public Receptionist() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
