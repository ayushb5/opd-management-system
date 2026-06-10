package com.OPD.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BillDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotNull(message="Consultation fee is required")
	@DecimalMin(value="0.0",message="Consultation fee cannot be negative")
	private BigDecimal consultationFee;
	
	@NotBlank(message="Payment status is required")
	private String paymentStatus;
	
	@NotBlank(message="Payment mode is required")
	private String paymentMode;
	
	@NotNull(message="Concession is required")
	@DecimalMin(value="0.0", message="Concession cannot be negative")
	private BigDecimal concession;
	
	@NotNull(message="Paid amount is required")
	@DecimalMin(value="0.0", message="Paid amount cannot be negative")
	private BigDecimal paidAmount;
	
	@NotNull(message="Total amount is required")
	@DecimalMin(value="0.0", message="Total amount cannot be negative")
	private BigDecimal totalAmount;

	public Integer getVisitId() {
		return visitId;
	}

	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
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

}
