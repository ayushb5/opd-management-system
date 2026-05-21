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
	private Integer morning_dose;

	@NotNull(message="Afternoon dose is required")
	@Min(value=0,message="Dose cannot be negative")
	private Integer afternoon_dose;

	@NotNull(message="Evening dose is required")
	@Min(value=0,message="Dose cannot be negative")
	private Integer evening_dose;
	
	@NotNull(message="Duration days required")
	@Min(value=1,message="Duration must be at least 1 day")
	private Integer duration_days;
	
	@NotNull(message="Total Quantity required")
	@Min(value=1,message="Total Quantity must be positive")
	private Integer total_quantity;
	
	private String quantity_note;
	private String dose_qty;
	private String dose_unit;
	
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
	public Integer getMorning_dose() {
		return morning_dose;
	}
	public void setMorning_dose(Integer morning_dose) {
		this.morning_dose = morning_dose;
	}
	public Integer getAfternoon_dose() {
		return afternoon_dose;
	}
	public void setAfternoon_dose(Integer afternoon_dose) {
		this.afternoon_dose = afternoon_dose;
	}
	public Integer getEvening_dose() {
		return evening_dose;
	}
	public void setEvening_dose(Integer evening_dose) {
		this.evening_dose = evening_dose;
	}
	public Integer getDuration_days() {
		return duration_days;
	}
	public void setDuration_days(Integer duration_days) {
		this.duration_days = duration_days;
	}
	public Integer getTotal_quantity() {
		return total_quantity;
	}
	public void setTotal_quantity(Integer total_quantity) {
		this.total_quantity = total_quantity;
	}
	public String getQuantity_note() {
		return quantity_note;
	}
	public void setQuantity_note(String quantity_note) {
		this.quantity_note = quantity_note;
	}
	public String getDose_qty() {
		return dose_qty;
	}
	public void setDose_qty(String dose_qty) {
		this.dose_qty = dose_qty;
	}
	public String getDose_unit() {
		return dose_unit;
	}
	public void setDose_unit(String dose_unit) {
		this.dose_unit = dose_unit;
	}
	
}
