package com.OPD.response;

import java.time.LocalDate;

import com.OPD.entities.Visit;
import com.OPD.entities.Visit.Status;

public class RecentVisitResponse {
	private Integer visitId;

	private String patientName;

	private String doctorName;

	private LocalDate visitDate;

	private Visit.Status status;

	public RecentVisitResponse() {
	}

	public RecentVisitResponse(Integer visitId, String patientName, String doctorName, LocalDate visitDate,
			Status status) {
		super();
		this.visitId = visitId;
		this.patientName = patientName;
		this.doctorName = doctorName;
		this.visitDate = visitDate;
		this.status = status;
	}

	public Integer getVisitId() {
		return visitId;
	}

	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public LocalDate getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(LocalDate visitDate) {
		this.visitDate = visitDate;
	}

	public Visit.Status getStatus() {
		return status;
	}

	public void setStatus(Visit.Status status) {
		this.status = status;
	}
	
}
