package com.OPD.dto;

import java.time.LocalDate;

import com.OPD.entities.Visit;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VisitDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	@NotNull(message="Patient id is required")
	private Integer patientId;
	
	@NotNull(message="Visit date is required")
	private LocalDate visitDate;
	
	@NotBlank(message="Complaint is required")
	private String complaints;
	
	private Visit.Status status;
	
	private String diagnosis;
	
	private String advice;
	
	private String bp;
	
	private Integer pulse;
	private Integer saturation;
	private Double temperature;
	private Integer respirationRate;
	
	private Double fastingSugar;
	private Double ppSugar;
	private Double randomSugar;
	
	private String ureaCreatinine;
	
	private String pastHistory;
	private String currentMedication;
	private String additionalNotes;
	
	private Double weight;
	
	private String edema;
	
	private String pallor;
	
	private String jaundice;
	
	private String cvs;
	
	private String rs;
	
	private String pa;
	
	private String cns;
	
	private Double hb;
	
	private String ecg;
	
	private LocalDate followupDate;

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public LocalDate getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(LocalDate visitDate) {
		this.visitDate = visitDate;
	}

	public String getComplaints() {
		return complaints;
	}

	public void setComplaints(String complaints) {
		this.complaints = complaints;
	}
	
	public Visit.Status getStatus() {
	    return status;
	}
	
	public void setStatus(Visit.Status status) {
	    this.status = status;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public String getBp() {
		return bp;
	}

	public void setBp(String bp) {
		this.bp = bp;
	}

	public Integer getPulse() {
		return pulse;
	}

	public void setPulse(Integer pulse) {
		this.pulse = pulse;
	}

	public Integer getSaturation() {
		return saturation;
	}

	public void setSaturation(Integer saturation) {
		this.saturation = saturation;
	}

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}

	public Integer getRespirationRate() {
		return respirationRate;
	}

	public void setRespirationRate(Integer respirationRate) {
		this.respirationRate = respirationRate;
	}

	public Double getFastingSugar() {
		return fastingSugar;
	}

	public void setFastingSugar(Double fastingSugar) {
		this.fastingSugar = fastingSugar;
	}

	public Double getPpSugar() {
		return ppSugar;
	}

	public void setPpSugar(Double ppSugar) {
		this.ppSugar = ppSugar;
	}

	public Double getRandomSugar() {
		return randomSugar;
	}

	public void setRandomSugar(Double randomSugar) {
		this.randomSugar = randomSugar;
	}

	public String getUreaCreatinine() {
		return ureaCreatinine;
	}

	public void setUreaCreatinine(String ureaCreatinine) {
		this.ureaCreatinine = ureaCreatinine;
	}

	public String getPastHistory() {
		return pastHistory;
	}

	public void setPastHistory(String pastHistory) {
		this.pastHistory = pastHistory;
	}

	public String getCurrentMedication() {
		return currentMedication;
	}

	public void setCurrentMedication(String currentMedication) {
		this.currentMedication = currentMedication;
	}

	public String getAdditionalNotes() {
		return additionalNotes;
	}

	public void setAdditionalNotes(String additionalNotes) {
		this.additionalNotes = additionalNotes;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getEdema() {
		return edema;
	}

	public void setEdema(String edema) {
		this.edema = edema;
	}

	public String getPallor() {
		return pallor;
	}

	public void setPallor(String pallor) {
		this.pallor = pallor;
	}

	public String getJaundice() {
		return jaundice;
	}

	public void setJaundice(String jaundice) {
		this.jaundice = jaundice;
	}

	public String getCvs() {
		return cvs;
	}

	public void setCvs(String cvs) {
		this.cvs = cvs;
	}

	public String getRs() {
		return rs;
	}

	public void setRs(String rs) {
		this.rs = rs;
	}

	public String getPa() {
		return pa;
	}

	public void setPa(String pa) {
		this.pa = pa;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public Double getHb() {
		return hb;
	}

	public void setHb(Double hb) {
		this.hb = hb;
	}

	public String getEcg() {
		return ecg;
	}

	public void setEcg(String ecg) {
		this.ecg = ecg;
	}

	public LocalDate getFollowupDate() {
		return followupDate;
	}

	public void setFollowupDate(LocalDate followupDate) {
		this.followupDate = followupDate;
	}

	public VisitDto() {
		
	}

}
