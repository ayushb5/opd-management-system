package com.OPD.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="medicines")
public class Medicine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	private String medicine_name;
	private String type;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
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
	public Medicine(int id, Doctor doctor, String medicine_name, String type) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.medicine_name = medicine_name;
		this.type = type;
	}
	@Override
	public String toString() {
		return "Medicines [id=" + id + ", doctor=" + doctor + ", medicine_name=" + medicine_name + ", type=" + type
				+ "]";
	}
	public Medicine() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
