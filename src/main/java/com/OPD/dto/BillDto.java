package com.OPD.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BillDto {
	private int visitId;
	private BigDecimal consultation_fee;
	private String payment_status;
	private String payment_mode;
	private BigDecimal concession;
	private BigDecimal paid_amount;
	private BigDecimal total_amount;
	private BigDecimal pending_amount;
	public int getVisitId() {
		return visitId;
	}
	public void setVisitId(int visitId) {
		this.visitId = visitId;
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
}
