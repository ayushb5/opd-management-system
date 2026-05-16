package com.OPD.dto;

public class PathologyTestDto {
	private int visitId;
	private int testId;
	private String result;
	private String remarks;
	private String report_file;
	public int getVisitId() {
		return visitId;
	}
	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}
	public int getTestId() {
		return testId;
	}
	public void setTestId(int testId) {
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
