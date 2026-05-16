package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Diagnostics {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="visit_id")
	private Visits visit;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	private String name;
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
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public Diagnostics(int id, Visits visit, Doctor doctor, String name, LocalDateTime created_at) {
		super();
		this.id = id;
		this.visit = visit;
		this.doctor = doctor;
		this.name = name;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Diagnostics [id=" + id + ", visit=" + visit + ", doctor=" + doctor + ", name=" + name + ", created_at="
				+ created_at + "]";
	}
	public Diagnostics() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
