package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="prescriptions")
public class Prescription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="visit_id",nullable=false)
	private Visit visit;
	
	@ManyToOne
	@JoinColumn(name="medicine_id",nullable=false)
	private Medicine medicine;
	
	@Column(nullable = false)
	private String dosage;
	
	private String duration;
	
	@Column(columnDefinition = "TEXT")
	private String instructions;
	
	@Column(nullable = false)
	private Integer quantity;
	
	private Integer morningDose;
	private Integer afternoonDose;
	private Integer eveningDose;
	@Column(nullable = false)
	private Integer durationDays;
	
	private Integer totalQuantity;
	private String quantityNote;
	private String doseQuantity;
	private String doseUnit;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@PrePersist
	public void onCreate() {
		createdAt=LocalDateTime.now();
	}
	
	public Prescription() {
		
    }
	
	@Override
	public String toString() {
	    return "Prescription [id=" + id +
	           ", dosage=" + dosage +
	           ", duration=" + duration +
	           "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Visit getVisit() {
		return visit;
	}

	public void setVisit(Visit visit) {
		this.visit = visit;
	}

	public Medicine getMedicine() {
		return medicine;
	}

	public void setMedicine(Medicine medicine) {
		this.medicine = medicine;
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Prescription(Integer id, Visit visit, Medicine medicine, String dosage, String duration, String instructions,
			Integer quantity, Integer morningDose, Integer afternoonDose, Integer eveningDose, Integer durationDays,
			Integer totalQuantity, String quantityNote, String doseQuantity, String doseUnit, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.visit = visit;
		this.medicine = medicine;
		this.dosage = dosage;
		this.duration = duration;
		this.instructions = instructions;
		this.quantity = quantity;
		this.morningDose = morningDose;
		this.afternoonDose = afternoonDose;
		this.eveningDose = eveningDose;
		this.durationDays = durationDays;
		this.totalQuantity = totalQuantity;
		this.quantityNote = quantityNote;
		this.doseQuantity = doseQuantity;
		this.doseUnit = doseUnit;
		this.createdAt = createdAt;
	}
	
	
	
}
