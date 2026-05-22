package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MedicineDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Medicine name is required")
	private String medicine_name;
	
	@NotBlank(message="Type is required")
	private String type;
	
	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	public String getMedicine_name() {
		return medicine_name;
	}
	public void setMedicine_name(String medicine_name) {
		this.medicine_name = medicine_name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
