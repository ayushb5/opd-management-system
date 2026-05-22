package com.OPD.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VisitReportDto {
	@NotNull(message="Visit id is required")
	private Integer visitId;
	
	@NotBlank(message="File name is required")
	private String file_name;
	
	@NotBlank(message="File URL is required")
	private String file_url;
	
	@NotBlank(message="File type is required")
	private String file_type;
	
	public Integer getVisitId() {
		return visitId;
	}
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_url() {
		return file_url;
	}
	public void setFile_url(String file_url) {
		this.file_url = file_url;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	
	
}
