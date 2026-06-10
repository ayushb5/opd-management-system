package com.OPD.dto;

import com.OPD.entities.Doctor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class DoctorDto {
	@NotBlank(message="Doctor name is required")
	private String name;
	
	@Email(message="Enter valid email")
	@NotBlank(message="Email is required")
	private String email;
	
	@NotBlank(message = "Password is required")
	@Size(
	    min = 6,
	    max = 20,
	    message = "Password must be between 6 and 20 characters"
	)
	private String password;
	
	@NotBlank(message="Specialization is required")
	private String specialization;
	
	@NotBlank(message="Clinic name is required")
	private String clinicName;
	
	@NotBlank(message="Address is required")
	private String address;
	
	@NotBlank(message="Mobile number is required")
	@Pattern(
		    regexp = "^[6-9]\\d{9}$",
		    message = "Enter valid mobile number"
		)
	private String mobileNo;
	
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

	public String getClinicName() {
		return clinicName;
	}

	public void setClinicName(String clinicName) {
		this.clinicName = clinicName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public Doctor.Status getStatus() {
		return status;
	}

	public void setStatus(Doctor.Status status) {
		this.status = status;
	}

	public DoctorDto() {
		
	}
	
	
	
}
