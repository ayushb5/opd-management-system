package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="pathology_tests")
public class PathologyTest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="visit_id",nullable=false)
	private Visit visit;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="test_master_id",nullable=false)
	private TestMaster testMaster;
	
	@Column(nullable = false)
	private String result;
	
	private String remarks;
	private String reportFile;
	
	@Column(nullable = false, updatable=false)
	private LocalDateTime createdAt;
	
	@PrePersist
	public void onCreate() {
		createdAt=LocalDateTime.now();
	}
	
	public PathologyTest() {
    }
	
	@Override
    public String toString() {
        return "PathologyTest [id=" + id +
                ", result=" + result + "]";
    }

	public PathologyTest(Integer id, Visit visit, TestMaster testMaster, String result, String remarks,
			String reportFile, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.visit = visit;
		this.testMaster = testMaster;
		this.result = result;
		this.remarks = remarks;
		this.reportFile = reportFile;
		this.createdAt = createdAt;
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

	public TestMaster getTestMaster() {
		return testMaster;
	}

	public void setTestMaster(TestMaster testMaster) {
		this.testMaster = testMaster;
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
		
}
