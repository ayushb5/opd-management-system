package com.OPD.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Bills {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@OneToOne
	@JoinColumn(name="visit_id")
	private Visits visit;
	private BigDecimal consultation_fee;
	private String payment_status;
	private String payment_mode;
	private BigDecimal concession;
	private BigDecimal paid_amount;
	private BigDecimal total_amount;
	private BigDecimal pending_amount;
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
	public BigDecimal getConsultation_fee() {
		return consultation_fee;
	}
	public void setConsultation_fee(BigDecimal consultation_fee) {
		this.consultation_fee = consultation_fee;
	}
	public String getPayment_status() {
		return payment_status;
	}
	public void setPayment_status(String payment_status) {
		this.payment_status = payment_status;
	}
	public String getPayment_mode() {
		return payment_mode;
	}
	public void setPayment_mode(String payment_mode) {
		this.payment_mode = payment_mode;
	}
	public BigDecimal getConcession() {
		return concession;
	}
	public void setConcession(BigDecimal concession) {
		this.concession = concession;
	}
	public BigDecimal getPaid_amount() {
		return paid_amount;
	}
	public void setPaid_amount(BigDecimal paid_amount) {
		this.paid_amount = paid_amount;
	}
	public BigDecimal getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(BigDecimal total_amount) {
		this.total_amount = total_amount;
	}
	public BigDecimal getPending_amount() {
		return pending_amount;
	}
	public void setPending_amount(BigDecimal pending_amount) {
		this.pending_amount = pending_amount;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public Bills(int id, Visits visit, BigDecimal consultation_fee, String payment_status, String payment_mode,
			BigDecimal concession, BigDecimal paid_amount, BigDecimal total_amount, BigDecimal pending_amount,
			LocalDateTime created_at) {
		super();
		this.id = id;
		this.visit = visit;
		this.consultation_fee = consultation_fee;
		this.payment_status = payment_status;
		this.payment_mode = payment_mode;
		this.concession = concession;
		this.paid_amount = paid_amount;
		this.total_amount = total_amount;
		this.pending_amount = pending_amount;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Bills [id=" + id + ", visit=" + visit + ", consultation_fee=" + consultation_fee + ", payment_status="
				+ payment_status + ", payment_mode=" + payment_mode + ", concession=" + concession + ", paid_amount="
				+ paid_amount + ", total_amount=" + total_amount + ", pending_amount=" + pending_amount
				+ ", created_at=" + created_at + "]";
	}
	public Bills() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
