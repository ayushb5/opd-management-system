package com.OPD.entities;

import java.time.LocalDate;
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
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "visits")
public class Visit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "doctor_id", nullable = false)
	private Doctor doctor;
	
	@Column(nullable = false)
	private LocalDate visitDate;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String complaints;
	@Column(columnDefinition = "TEXT")
	private String diagnosis;
	@Column(columnDefinition = "TEXT")
	private String advice;
	
	public enum Status {
	    WAITING,
	    IN_CONSULTATION,
	    COMPLETED,
	    CANCELLED
	}
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;
	
	private String bp;
	
	private Integer pulse;
	private Integer saturation;
	private Double temperature;
	private Integer respirationRate;
	
	private Double fastingSugar;
	private Double ppSugar;
	private Double randomSugar;
	
	private String ureaCreatinine;
	
	@Column(columnDefinition = "TEXT")
	private String pastHistory;
	
	@Column(columnDefinition = "TEXT")
	private String currentMedication;

	@Column(columnDefinition = "TEXT")
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
	
	@Column(columnDefinition = "TEXT")
	private String ecg;
	
	private LocalDate followupDate;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime updatedAt;
	
	@PrePersist
	public void onCreate() {
	    createdAt = LocalDateTime.now();
	    updatedAt = LocalDateTime.now();
	    
	    if(status == null) {
	        status = Status.WAITING;
	    }
	}

	@PreUpdate
	public void onUpdate() {
	    updatedAt = LocalDateTime.now();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Visit(Integer id, Patient patient, Doctor doctor, LocalDate visitDate, String complaints,Status status, String diagnosis,
			String advice, String bp, Integer pulse, Integer saturation, Double temperature, Integer respirationRate,
			Double fastingSugar, Double ppSugar, Double randomSugar, String ureaCreatinine, String pastHistory,
			String currentMedication, String additionalNotes, Double weight, String edema, String pallor,
			String jaundice, String cvs, String rs, String pa, String cns, Double hb, String ecg,
			LocalDate followupDate, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.patient = patient;
		this.doctor = doctor;
		this.visitDate = visitDate;
		this.complaints = complaints;
		this.status=status;
		this.diagnosis = diagnosis;
		this.advice = advice;
		this.bp = bp;
		this.pulse = pulse;
		this.saturation = saturation;
		this.temperature = temperature;
		this.respirationRate = respirationRate;
		this.fastingSugar = fastingSugar;
		this.ppSugar = ppSugar;
		this.randomSugar = randomSugar;
		this.ureaCreatinine = ureaCreatinine;
		this.pastHistory = pastHistory;
		this.currentMedication = currentMedication;
		this.additionalNotes = additionalNotes;
		this.weight = weight;
		this.edema = edema;
		this.pallor = pallor;
		this.jaundice = jaundice;
		this.cvs = cvs;
		this.rs = rs;
		this.pa = pa;
		this.cns = cns;
		this.hb = hb;
		this.ecg = ecg;
		this.followupDate = followupDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
	    return "Visit [id=" + id +
	            ", visitDate=" + visitDate +
	            ", complaints=" + complaints +
	            "]";
	}

	public Visit() {
		super();
	}
	
}
