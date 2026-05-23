package com.OPD.entities;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="doctors")
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String email;
	private String password;
	private String specialization;
	private String clinic_name;
	private String address;
	private String mobileno;
	private String token;
	
	public enum Status{
		TRIAL,
		ACTIVE,
		EXPIRED,
		CANCEL
	}
	
	@Enumerated(EnumType.STRING)
	private Status status;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	public String getClinic_name() {
		return clinic_name;
	}
	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMobileno() {
		return mobileno;
	}
	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
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
	public Doctor(int id, String name, String email, String password, String specialization, String clinic_name,
			String address, String mobileno, String token, Status status, LocalDateTime created_at,
			LocalDateTime updated_at) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.specialization = specialization;
		this.clinic_name = clinic_name;
		this.address = address;
		this.mobileno = mobileno;
		this.token = token;
		this.status = status;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
	@Override
	public String toString() {
		return "Doctor [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", specialization=" + specialization + ", clinic_name=" + clinic_name + ", address=" + address
				+ ", mobileno=" + mobileno + ", token=" + token + ", status=" + status + ", created_at=" + created_at
				+ ", updated_at=" + updated_at + "]";
	}
	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
