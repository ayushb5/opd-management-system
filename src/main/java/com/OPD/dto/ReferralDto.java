package com.OPD.dto;

import com.OPD.entities.Referral;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReferralDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotNull(message="Patient id is required")
	private Integer patientId;
	
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	
	@NotNull(message="Referral Center id is required")
	private Integer referralCenterId;
	
	private Referral.Note_type note_type;
	
	@NotBlank(message="Reason is required")
	private String reason;
	
	@NotBlank(message="Details are required")
	private String details;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	public int getReferralCenterId() {
		return referralCenterId;
	}
	public void setReferralCenterId(Integer referralCenterId) {
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
