package com.OPD.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VisitsDto {
	@NotNull(message="Doctor id is required")
	private Integer doctorId;
	@NotNull(message="Patient id is required")
	private Integer patientId;
	
	@NotNull(message="Visit date is required")
	private LocalDate visit_date;
	
	@NotBlank(message="Complaint is required")
	private String complaints;
	
	@NotBlank(message="Diagnosis is required")
	private String diagnosis;
	
	@NotBlank(message="Advice is required")
	private String advice;
	
	private String bp;
	
	private String pulse;
	
	private String saturation;
	
	private String temperature;
	
	private String respiration_rate;
	
	private String sugar;
	
	private String fasting_sugar;
	
	private String pp_sugar;
	
	private String random_sugar;
	
	private String urea_creatinine;
	
	private String past_history;
	
	private String current_medication;
	
	private String additional_notes;
	
	@NotNull(message="Weight is required")
	private Integer weight;
	
	private String edema;
	
	private String pallor;
	
	private String jaundice;
	
	private String cvs;
	
	private String rs;
	
	private String pa;
	
	private String cns;
	
	private String hb;
	
	private String ecg;
	
	@NotNull(message="Follow up date is required")
	private LocalDate followup_date;
	
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
	public LocalDate getVisit_date() {
		return visit_date;
	}
	public void setVisit_date(LocalDate visit_date) {
		this.visit_date = visit_date;
	}
	public String getComplaints() {
		return complaints;
	}
	public void setComplaints(String complaints) {
		this.complaints = complaints;
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
	public String getPulse() {
		return pulse;
	}
	public void setPulse(String pulse) {
		this.pulse = pulse;
	}
	public String getSaturation() {
		return saturation;
	}
	public void setSaturation(String saturation) {
		this.saturation = saturation;
	}
	public String getTemperature() {
		return temperature;
	}
	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}
	public String getRespiration_rate() {
		return respiration_rate;
	}
	public void setRespiration_rate(String respiration_rate) {
		this.respiration_rate = respiration_rate;
	}
	public String getSugar() {
		return sugar;
	}
	public void setSugar(String sugar) {
		this.sugar = sugar;
	}
	public String getFasting_sugar() {
		return fasting_sugar;
	}
	public void setFasting_sugar(String fasting_sugar) {
		this.fasting_sugar = fasting_sugar;
	}
	public String getPp_sugar() {
		return pp_sugar;
	}
	public void setPp_sugar(String pp_sugar) {
		this.pp_sugar = pp_sugar;
	}
	public String getRandom_sugar() {
		return random_sugar;
	}
	public void setRandom_sugar(String random_sugar) {
		this.random_sugar = random_sugar;
	}
	public String getUrea_creatinine() {
		return urea_creatinine;
	}
	public void setUrea_creatinine(String urea_creatinine) {
		this.urea_creatinine = urea_creatinine;
	}
	public String getPast_history() {
		return past_history;
	}
	public void setPast_history(String past_history) {
		this.past_history = past_history;
	}
	public String getCurrent_medication() {
		return current_medication;
	}
	public void setCurrent_medication(String current_medication) {
		this.current_medication = current_medication;
	}
	public String getAdditional_notes() {
		return additional_notes;
	}
	public void setAdditional_notes(String additional_notes) {
		this.additional_notes = additional_notes;
	}
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
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
	public String getHb() {
		return hb;
	}
	public void setHb(String hb) {
		this.hb = hb;
	}
	public String getEcg() {
		return ecg;
	}
	public void setEcg(String ecg) {
		this.ecg = ecg;
	}
	public LocalDate getFollowup_date() {
		return followup_date;
	}
	public void setFollowup_date(LocalDate followup_date) {
		this.followup_date = followup_date;
	}
	
}
