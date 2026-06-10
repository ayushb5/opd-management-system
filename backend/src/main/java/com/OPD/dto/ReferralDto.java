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
	
	@NotNull(message = "Note type is required")
	private Referral.NoteType noteType;
	
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

	public Integer getReferralCenterId() {
		return referralCenterId;
	}

	public void setReferralCenterId(Integer referralCenterId) {
		this.referralCenterId = referralCenterId;
	}

	public Referral.NoteType getNoteType() {
		return noteType;
	}

	public void setNoteType(Referral.NoteType noteType) {
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

}
