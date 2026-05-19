package com.OPD.dto;

import com.OPD.entities.ReferralCenter;

public class ReferralCenterDto {
	private int doctorId;
	private String name;
	private ReferralCenter.Type type;
	private String contact_info;
	private String address;
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
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
	public String getContact_info() {
		return contact_info;
	}
	public void setContact_info(String contact_info) {
		this.contact_info = contact_info;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
}
