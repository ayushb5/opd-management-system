package com.OPD.dto;

import com.OPD.entities.Doctor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DoctorDto {
	@NotBlank(message="Doctor name is required")
	private String name;
	
	@Email(message="Enter valid email")
	@NotBlank(message="email is required")
	private String email;
	
	@NotBlank(message="Password is required")
	@Size(min=6,message="Password must be at least 6 characters")
	private String password;
	
	@NotBlank(message="Specialization is required")
	private String specialization;
	
	@NotBlank(message="Clinic name is required")
	private String clinic_name;
	
	@NotBlank(message="Address is required")
	private String address;
	
	@NotBlank(message="Mobile number is required")
	private String mobileno;
	private String token;
	
	@NotBlank(message="Status is required")
	private Doctor.Status status;
	
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
	public Doctor.Status getStatus() {
	    return status;
	}

	public void setStatus(Doctor.Status status) {
	    this.status = status;
	}
}
