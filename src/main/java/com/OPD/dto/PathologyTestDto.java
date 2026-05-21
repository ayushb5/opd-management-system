package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PathologyTestDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotNull(message="Test id is required")
	private Integer testId;
	
//	@NotBlank(message="Result is required")
	private String result;
	
	@NotBlank(message="Remarks required")
	private String remarks;
	
//	@NotBlank(message="Report file is required")
	private String report_file;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
	public Integer getTestId() {
		return testId;
	}
	public void setTestId(Integer testId) {
		this.testId = testId;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getReport_file() {
		return report_file;
	}
	public void setReport_file(String report_file) {
		this.report_file = report_file;
	}
	
}
