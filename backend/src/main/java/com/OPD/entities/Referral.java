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
@Table(name="referrals")
public class Referral {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="visit_id", nullable=false)
	private Visit visit;
	
	@ManyToOne
	@JoinColumn(name="patient_id", nullable=false)
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name="doctor_id", nullable=false)
	private Doctor doctor;

	@ManyToOne
	@JoinColumn(name="referral_center_id", nullable=false)
	private ReferralCenter referralCenter;
	
	public enum NoteType{
		PATHOLOGY,
		PHARMACY,
		HIGHER_CENTER,
		DIAGNOSTIC
	}
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private NoteType noteType;
	
	@Column(nullable = false)
	private String reason;
	
	@Column(columnDefinition = "TEXT")
	private String details;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@PrePersist
	public void onCreate() {
		createdAt=LocalDateTime.now();
	}
	
	public Referral() {
	}

	public Referral(Integer id, Visit visit, Patient patient, Doctor doctor, ReferralCenter referralCenter,
			NoteType noteType, String reason, String details, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.visit = visit;
		this.patient = patient;
		this.doctor = doctor;
		this.referralCenter = referralCenter;
		this.noteType = noteType;
		this.reason = reason;
		this.details = details;
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Referral [id=" + id + ", visit=" + visit + ", patient=" + patient + ", doctor=" + doctor
				+ ", referralCenter=" + referralCenter + ", noteType=" + noteType + ", reason=" + reason + ", details="
				+ details + ", createdAt=" + createdAt + "]";
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

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public ReferralCenter getReferralCenter() {
		return referralCenter;
	}

	public void setReferralCenter(ReferralCenter referralCenter) {
		this.referralCenter = referralCenter;
	}

	public NoteType getNoteType() {
		return noteType;
	}

	public void setNoteType(NoteType noteType) {
		this.noteType = noteType;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}
