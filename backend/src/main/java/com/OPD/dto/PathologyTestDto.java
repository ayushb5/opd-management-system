package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PathologyTestDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotNull(message="Test Master id is required")
	private Integer testMasterId;
	
	private String result;
	
	private String remarks;
	
	private String reportFile;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
	public Integer getTestMasterId() {
		return testMasterId;
	}
	public void setTestMasterId(Integer testMasterId) {
		this.testMasterId = testMasterId;
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
	public String getReportFile() {
		return reportFile;
	}
	public void setReportFile(String reportFile) {
		this.reportFile = reportFile;
	}
	
}
