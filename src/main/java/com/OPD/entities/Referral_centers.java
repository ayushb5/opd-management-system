package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Referral_centers {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	private String name;
	public enum Type{
		DOCTOR,
		LAB,
		HOSPITAL,
		PHARMACY
	}
	private Type type;
	private String contact_info;
	private String address;
	private LocalDateTime created_at;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Type getType() {
		return type;
	}
	public void setType(Type type) {
		this.type = type;
	}
	public String getContact_info() {
		return contact_info;
	}
	public void setContact_info(String contact_info) {
		this.contact_info = contact_info;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public Referral_centers(int id, Doctor doctor, String name, Type type, String contact_info, String address,
			LocalDateTime created_at) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.name = name;
		this.type = type;
		this.contact_info = contact_info;
		this.address = address;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Referral_centers [id=" + id + ", doctor=" + doctor + ", name=" + name + ", type=" + type
				+ ", contact_info=" + contact_info + ", address=" + address + ", created_at=" + created_at + "]";
	}
	public Referral_centers() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
