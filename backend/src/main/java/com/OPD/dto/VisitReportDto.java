package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VisitReportDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotBlank(message = "File name is required")
	private String fileName;

	@NotBlank(message = "File URL is required")
	private String fileUrl;

	@NotBlank(message = "File type is required")
	private String fileType;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
	public String getFileName() {
	    return fileName;
	}

	public void setFileName(String fileName) {
	    this.fileName = fileName;
	}

	public String getFileUrl() {
	    return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
	    this.fileUrl = fileUrl;
	}

	public String getFileType() {
	    return fileType;
	}

	public void setFileType(String fileType) {
	    this.fileType = fileType;
	}
	
}
