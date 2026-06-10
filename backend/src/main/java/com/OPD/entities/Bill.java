package com.OPD.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="bills")
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToOne
	@JoinColumn(name="visit_id",nullable=false,unique=true)
	private Visit visit;
	
	@Column(nullable=false)
	private BigDecimal consultationFee;
	
	@Column(nullable=false)
	private String paymentStatus;
	
	@Column(nullable=false)
	private String paymentMode;
	
	@Column(nullable=false)
	private BigDecimal concession;
	
	@Column(nullable=false)
	private BigDecimal paidAmount;
	
	@Column(nullable=false)
	private BigDecimal totalAmount;
	
	@Column(nullable=false)
	private BigDecimal pendingAmount;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	public void onCreate() {
	    createdAt = LocalDateTime.now();
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
	public BigDecimal getConsultationFee() {
		return consultationFee;
	}
	public void setConsultationFee(BigDecimal consultationFee) {
		this.consultationFee = consultationFee;
	}
	public String getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public BigDecimal getConcession() {
		return concession;
	}
	public void setConcession(BigDecimal concession) {
		this.concession = concession;
	}
	public BigDecimal getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(BigDecimal paidAmount) {
		this.paidAmount = paidAmount;
	}
	public BigDecimal getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}
	public BigDecimal getPendingAmount() {
		return pendingAmount;
	}
	public void setPendingAmount(BigDecimal pendingAmount) {
		this.pendingAmount = pendingAmount;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	public Bill() {
	}
	
	public Bill(Integer id, Visit visit, BigDecimal consultationFee,
            String paymentStatus, String paymentMode,
            BigDecimal concession, BigDecimal paidAmount,
            BigDecimal totalAmount, BigDecimal pendingAmount,
            LocalDateTime createdAt) {
			this.id = id;
			this.visit = visit;
			this.consultationFee = consultationFee;
			this.paymentStatus = paymentStatus;
			this.paymentMode = paymentMode;
			this.concession = concession;
			this.paidAmount = paidAmount;
			this.totalAmount = totalAmount;
			this.pendingAmount = pendingAmount;
			this.createdAt = createdAt;
	}
	
	@Override
	public String toString() {
	    return "Bill [id=" + id +
	           ", consultationFee=" + consultationFee +
	           ", totalAmount=" + totalAmount +
	           ", paymentStatus=" + paymentStatus +
	           "]";
	}
	
}
