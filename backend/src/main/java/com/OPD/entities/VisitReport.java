package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "visit_reports")
public class VisitReport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
	@JoinColumn(name = "visit_id", nullable = false)
	private Visit visit;
	
	@Column(nullable = false, length = 255)
	private String fileName;

	@Column(nullable = false, length = 500)
	private String fileUrl;

	@Column(nullable = false, length = 100)
	private String fileType;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	public void onCreate() {
	    createdAt = LocalDateTime.now();
	}
	
	@Override
	public String toString() {
	    return "VisitReport [id=" + id +
	           ", fileName=" + fileName +
	           ", fileType=" + fileType +
	           "]";
	}

	public VisitReport(Integer id, Visit visit, String fileName, String fileUrl, String fileType,
			LocalDateTime createdAt) {
		super();
		this.id = id;
		this.visit = visit;
		this.fileName = fileName;
		this.fileUrl = fileUrl;
		this.fileType = fileType;
		this.createdAt = createdAt;
	}

	public VisitReport() {
		super();
		// TODO Auto-generated constructor stub
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
