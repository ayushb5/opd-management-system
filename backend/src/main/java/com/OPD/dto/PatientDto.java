package com.OPD.dto;

import com.OPD.entities.Patient;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class PatientDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotBlank(message="Patient name is required")
	private String patientName;
	
	@NotNull(message="Age is required")
	@Min(value = 1, message = "Age must be greater than 0")
	private Integer age;
	
	@NotNull(message="Gender is required")
	private Patient.Gender gender;
	
	@NotBlank(message = "Mobile number is required")
	@Pattern(
	    regexp = "^[6-9]\\d{9}$",
	    message = "Enter valid mobile number"
	)
	private String mobileNo;
	
	@NotBlank(message="Address is required")
	private String address;
	@NotBlank(message="Blood group is required")
	private String bloodGroup;
	
	@NotNull(message="Height is required")
	@Min(value = 1, message = "Height must be greater than 0")
	private Integer height;
	
	private String smoking;
	private String alcohol;
	private String tobacco;
	
	public PatientDto() {
		
	}

	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Patient.Gender getGender() {
		return gender;
	}
	public void setGender(Patient.Gender gender) {
		this.gender = gender;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public String getSmoking() {
		return smoking;
	}
	public void setSmoking(String smoking) {
		this.smoking = smoking;
	}
	public String getAlcohol() {
		return alcohol;
	}
	public void setAlcohol(String alcohol) {
		this.alcohol = alcohol;
	}
	public String getTobacco() {
		return tobacco;
	}
	public void setTobacco(String tobacco) {
		this.tobacco = tobacco;
	}
		
}
