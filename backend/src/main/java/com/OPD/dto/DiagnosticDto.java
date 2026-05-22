package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DiagnosticDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Name is required")
	private String name;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
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
}
