package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TestMasterDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Test name is required")
	private String test_name;
	
	@NotBlank(message="Normal range is required")
	private String normal_range;
	
	@NotBlank(message="Unit is required")
	private String unit;
	
	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	public String getTest_name() {
		return test_name;
	}
	public void setTest_name(String test_name) {
		this.test_name = test_name;
	}
	public String getNormal_range() {
		return normal_range;
	}
	public void setNormal_range(String normal_range) {
		this.normal_range = normal_range;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	
}	
