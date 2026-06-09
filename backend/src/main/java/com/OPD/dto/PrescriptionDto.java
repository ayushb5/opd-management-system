package com.OPD.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PrescriptionDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotNull(message="Medicine id is required")
	private Integer medicineId;
	
	@NotBlank(message="Dosage is required")
	private String dosage;
	
	@NotBlank(message="Duration is required")
	private String duration;
	
	@NotBlank(message="Instructions are required")
	private String instructions;
	
	@NotNull(message="Quantity is required")
	@Min(value=1,message="Quantity must be at least 1")
	private Integer quantity;
	
	@NotNull(message="Morning dose is required")
	@Min(value=0,message="Dose cannot be negative")
	private Integer morningDose;

	@NotNull(message="Afternoon dose is required")
	@Min(value=0,message="Dose cannot be negative")
	private Integer afternoonDose;

	@NotNull(message="Evening dose is required")
	@Min(value=0,message="Dose cannot be negative")
	private Integer eveningDose;
	
	@NotNull(message="Duration days required")
	@Min(value=1,message="Duration must be at least 1 day")
	private Integer durationDays;
	
	@NotNull(message="Total Quantity required")
	@Min(value=1,message="Total Quantity must be positive")
	private Integer totalQuantity;
	
	private String quantityNote;
	private String doseQuantity;
	private String doseUnit;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
	public Integer getMedicineId() {
		return medicineId;
	}
	public void setMedicineId(Integer medicineId) {
		this.medicineId = medicineId;
	}
	public String getDosage() {
		return dosage;
	}
	public void setDosage(String dosage) {
		this.dosage = dosage;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Integer getMorningDose() {
		return morningDose;
	}
	public void setMorningDose(Integer morningDose) {
		this.morningDose = morningDose;
	}
	public Integer getAfternoonDose() {
		return afternoonDose;
	}
	public void setAfternoonDose(Integer afternoonDose) {
		this.afternoonDose = afternoonDose;
	}
	public Integer getEveningDose() {
		return eveningDose;
	}
	public void setEveningDose(Integer eveningDose) {
		this.eveningDose = eveningDose;
	}
	public Integer getDurationDays() {
		return durationDays;
	}
	public void setDurationDays(Integer durationDays) {
		this.durationDays = durationDays;
	}
	public Integer getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(Integer totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public String getQuantityNote() {
		return quantityNote;
	}
	public void setQuantityNote(String quantityNote) {
		this.quantityNote = quantityNote;
	}
	public String getDoseQuantity() {
		return doseQuantity;
	}
	public void setDoseQuantity(String doseQuantity) {
		this.doseQuantity = doseQuantity;
	}
	public String getDoseUnit() {
		return doseUnit;
	}
	public void setDoseUnit(String doseUnit) {
		this.doseUnit = doseUnit;
	}
	
}
