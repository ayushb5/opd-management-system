package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Referral {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="visit_id")
	private Visits visit;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;

	@ManyToOne
	@JoinColumn(name="referral_center_id")
	private ReferralCenter referral_centers;
	
	public enum Note_type{
		PATHOLOGY,
		PHARMACY,
		HIGHER_CENTER,
		DIAGNOSTIC
	}
	private Note_type note_type;
	private String reason;
	private String details;
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
	public ReferralCenter getReferral_centers() {
		return referral_centers;
	}
	public void setReferral_centers(ReferralCenter referral_centers) {
		this.referral_centers = referral_centers;
	}
	public Note_type getNote_type() {
		return note_type;
	}
	public void setNote_type(Note_type note_type) {
		this.note_type = note_type;
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
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public Referral(int id, Visits visit, Patient patient, Doctor doctor, ReferralCenter referral_centers,
			Note_type note_type, String reason, String details, LocalDateTime created_at) {
		super();
		this.id = id;
		this.visit = visit;
		this.patient = patient;
		this.doctor = doctor;
		this.referral_centers = referral_centers;
		this.note_type = note_type;
		this.reason = reason;
		this.details = details;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Referrals [id=" + id + ", visit=" + visit + ", patient=" + patient + ", doctor=" + doctor
				+ ", referral_centers=" + referral_centers + ", note_type=" + note_type + ", reason=" + reason
				+ ", details=" + details + ", created_at=" + created_at + "]";
	}
	public Referral() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
