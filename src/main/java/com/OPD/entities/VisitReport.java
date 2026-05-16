package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class VisitReport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name="visit_id")
	private Visits visit;
	private String file_name;
	private String file_url;
	private String file_type;
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
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public VisitReport(int id, Visits visit, String file_name, String file_url, String file_type,
			LocalDateTime created_at) {
		super();
		this.id = id;
		this.visit = visit;
		this.file_name = file_name;
		this.file_url = file_url;
		this.file_type = file_type;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Visit_reports [id=" + id + ", visit=" + visit + ", file_name=" + file_name + ", file_url=" + file_url
				+ ", file_type=" + file_type + ", created_at=" + created_at + "]";
	}
	public VisitReport() {
		super();
	}
	
	
}
