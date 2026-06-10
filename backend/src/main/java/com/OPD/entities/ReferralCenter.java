package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="referral_centers")
public class ReferralCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="doctor_id",nullable=false)
	private Doctor doctor;
	
	@Column(nullable = false)
	private String name;
	
	public enum Type{
		DOCTOR,
		LAB,
		HOSPITAL,
		PHARMACY
	}
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Type type;
	
	@Column(nullable = false)
	private String contactInfo;
	
	@Column(nullable = false)
	private String address;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@PrePersist
	public void onCreate() {
		createdAt=LocalDateTime.now();
	}
	
	public ReferralCenter() {
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public String getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public ReferralCenter(Integer id, Doctor doctor, String name, Type type, String contactInfo, String address,
			LocalDateTime createdAt) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.name = name;
		this.type = type;
		this.contactInfo = contactInfo;
		this.address = address;
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "ReferralCenter [id=" + id + ", doctor=" + doctor + ", name=" + name + ", type=" + type
				+ ", contactInfo=" + contactInfo + ", address=" + address + ", createdAt=" + createdAt + "]";
	}
	
	
}
