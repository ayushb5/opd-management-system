package com.OPD.dto;

import com.OPD.entities.Receptionist;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ReceptionistDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Name is required")
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
	
	@NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Enter valid mobile number"
    )
	private String mobileNo;
	
	@NotNull(message = "Status is required")
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

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public Receptionist.Status getStatus() {
		return status;
	}

	public void setStatus(Receptionist.Status status) {
		this.status = status;
	}
		
}
