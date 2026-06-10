package com.OPD.dto;

import com.OPD.entities.ReferralCenter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReferralCenterDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Name is required")
	private String name;
	
	@NotNull(message = "Type is required")
	private ReferralCenter.Type type;
	
	@NotBlank(message="Contact Info is required")
	private String contactInfo;
	
	@NotBlank(message="Address is required")
	private String address;

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

	public ReferralCenter.Type getType() {
		return type;
	}

	public void setType(ReferralCenter.Type type) {
		this.type = type;
	}

	public String getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
}
