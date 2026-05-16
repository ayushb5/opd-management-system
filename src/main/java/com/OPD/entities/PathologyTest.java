package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PathologyTest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="visit_id")
	private Visits visit;
	
	@ManyToOne
	@JoinColumn(name="test_id")
	private TestMaster test_masters;
	
	private String result;
	private String remarks;
	private String report_file;
	private LocalDateTime created_at;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Visits getVisit() {
		return visit;
	}
	public void setVisit(Visits visit) {
		this.visit = visit;
	}
	public TestMaster getTest_masters() {
		return test_masters;
	}
	public void setTest_masters(TestMaster test_masters) {
		this.test_masters = test_masters;
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
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public PathologyTest(int id, Visits visit, TestMaster test_masters, String result, String remarks,
			String report_file, LocalDateTime created_at) {
		super();
		this.id = id;
		this.visit = visit;
		this.test_masters = test_masters;
		this.result = result;
		this.remarks = remarks;
		this.report_file = report_file;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Pathology_tests [id=" + id + ", visit=" + visit + ", test_masters=" + test_masters + ", result="
				+ result + ", remarks=" + remarks + ", report_file=" + report_file + ", created_at=" + created_at + "]";
	}
	public PathologyTest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
