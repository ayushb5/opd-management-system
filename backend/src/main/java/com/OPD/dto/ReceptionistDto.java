package com.OPD.dto;

import com.OPD.entities.Receptionist;
import com.OPD.entities.Receptionist.Status;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReceptionistDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Name is required")
	private String name;
	
	@Email(message="Enter valid email")
	@NotBlank(message="Email is required")
	private String email;
	
	private String password;
	
	@NotBlank(message="Mobile number is required")
	private String mobileno;
	
	private Receptionist.Status status;
	
	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
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
	public Receptionist.Status getStatus() {
		return status;
	}
	public void setStatus(Receptionist.Status status) {
		this.status = status;
	}
	public ReceptionistDto(Integer doctorId, String name, String email, String password, String mobileno,
			Status status) {
		super();
		this.doctorId = doctorId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.mobileno = mobileno;
		this.status = status;
	}
	public ReceptionistDto() {
		super();
	}
}
