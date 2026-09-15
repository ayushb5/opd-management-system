package com.OPD.dto;

import java.math.BigDecimal;

public class PaymentBreakdownDto {
	private String mode;
	private Long count;
	private BigDecimal amount;
	
	public PaymentBreakdownDto() {
	}

	public PaymentBreakdownDto(String mode, Long count, BigDecimal amount) {
		super();
		this.mode = mode;
		this.count = count;
		this.amount = amount;
	}
	
	public PaymentBreakdownDto(String mode, Long count, Object amount) {
		super();
		this.mode = mode;
		this.count = count;
		if (amount instanceof BigDecimal) {
			this.amount = (BigDecimal) amount;
		} else if (amount != null) {
			this.amount = new BigDecimal(amount.toString());
		} else {
			this.amount = BigDecimal.ZERO;
		}
	}


	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "PaymentBreakdownDto [mode=" + mode + ", count=" + count + ", amount=" + amount + "]";
	}
	
}
