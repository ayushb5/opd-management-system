package com.OPD.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tests_masters")
public class TestMaster {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	private String test_name;
	private String normal_range;
	private String unit;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public String getTest_name() {
		return test_name;
	}
	public void setTest_name(String test_name) {
		this.test_name = test_name;
	}
	public String getNormal_range() {
		return normal_range;
	}
	public void setNormal_range(String normal_range) {
		this.normal_range = normal_range;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public TestMaster(int id, Doctor doctor, String test_name, String normal_range, String unit) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.test_name = test_name;
		this.normal_range = normal_range;
		this.unit = unit;
	}
	@Override
	public String toString() {
		return "Tests_master [id=" + id + ", doctor=" + doctor + ", test_name=" + test_name + ", normal_range="
				+ normal_range + ", unit=" + unit + "]";
	}
	public TestMaster() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
