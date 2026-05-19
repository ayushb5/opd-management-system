package com.OPD.dto;

import com.OPD.entities.Referral;

public class ReferralDto {
	
	private int visitId;
	private int patientId;
	private int doctorId;
	private int referralCenterId;
	private Referral.Note_type note_type;
	private String reason;
	private String details;
	
	public int getVisitId() {
		return visitId;
	}
	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public int getReferralCenterId() {
		return referralCenterId;
	}
	public void setReferralCenterId(int referralCenterId) {
		this.referralCenterId = referralCenterId;
	}
	public Referral.Note_type getNote_type() {
		return note_type;
	}
	public void setNote_type(Referral.Note_type note_type) {
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
}
