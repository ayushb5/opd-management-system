package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Prescriptions {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="visit_id")
	private Visits visit;
	
	@ManyToOne
	@JoinColumn(name="medicine_id")
	private Medicine medicine;
	
	private String dosage;
	private String duration;
	private String instructions;
	private int quantity;
	private int morning_dose;
	private int afternoon_dose;
	private int evening_dose;
	private int duration_days;
	private int total_quantity;
	private String quantity_note;
	private String dose_qty;
	private String dose_unit;
	private LocalDateTime created_at;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Visits getVisit() {
		return visit;
	}
	public void setVisit(Visits visit) {
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
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public int getMorning_dose() {
		return morning_dose;
	}
	public void setMorning_dose(int morning_dose) {
		this.morning_dose = morning_dose;
	}
	public int getAfternoon_dose() {
		return afternoon_dose;
	}
	public void setAfternoon_dose(int afternoon_dose) {
		this.afternoon_dose = afternoon_dose;
	}
	public int getEvening_dose() {
		return evening_dose;
	}
	public void setEvening_dose(int evening_dose) {
		this.evening_dose = evening_dose;
	}
	public int getDuration_days() {
		return duration_days;
	}
	public void setDuration_days(int duration_days) {
		this.duration_days = duration_days;
	}
	public int getTotal_quantity() {
		return total_quantity;
	}
	public void setTotal_quantity(int total_quantity) {
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
	public Prescriptions(int id, Visits visit, Medicine medicine, String dosage, String duration, String instructions,
			int quantity, LocalDateTime created_at, int morning_dose, int afternoon_dose, int evening_dose,
			int duration_days, int total_quantity, String quantity_note, String dose_qty, String dose_unit) {
		super();
		this.id = id;
		this.visit = visit;
		this.medicine = medicine;
		this.dosage = dosage;
		this.duration = duration;
		this.instructions = instructions;
		this.quantity = quantity;
		this.created_at = created_at;
		this.morning_dose = morning_dose;
		this.afternoon_dose = afternoon_dose;
		this.evening_dose = evening_dose;
		this.duration_days = duration_days;
		this.total_quantity = total_quantity;
		this.quantity_note = quantity_note;
		this.dose_qty = dose_qty;
		this.dose_unit = dose_unit;
	}
	@Override
	public String toString() {
		return "Prescriptions [id=" + id + ", visit=" + visit + ", medicine=" + medicine + ", dosage=" + dosage
				+ ", duration=" + duration + ", instructions=" + instructions + ", quantity=" + quantity
				+ ", created_at=" + created_at + ", morning_dose=" + morning_dose + ", afternoon_dose=" + afternoon_dose
				+ ", evening_dose=" + evening_dose + ", duration_days=" + duration_days + ", total_quantity="
				+ total_quantity + ", quantity_note=" + quantity_note + ", dose_qty=" + dose_qty + ", dose_unit="
				+ dose_unit + "]";
	}
	public Prescriptions() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
