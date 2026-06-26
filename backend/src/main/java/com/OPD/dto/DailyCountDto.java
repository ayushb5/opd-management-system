package com.OPD.dto;

import java.time.LocalDate;

public class DailyCountDto {
	LocalDate date;
	Long count;
	
	public DailyCountDto() {
	}
	
	public DailyCountDto(LocalDate date, Long count) {
		super();
		this.date = date;
		this.count = count;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "DailyCountDto [date=" + date + ", count=" + count + "]";
	}
	
}
