package com.OPD.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="test_masters")
public class TestMaster {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="doctor_id", nullable = false)
	private Doctor doctor;
	
	@Column(nullable = false)
	private String testName;
	
	private String normalRange;
	
	private String unit;
	
	public TestMaster() {
		
	}
	
	public TestMaster(Integer id, Doctor doctor, String testName,
            String normalRange, String unit) {
					this.id = id;
					this.doctor = doctor;
					this.testName = testName;
					this.normalRange = normalRange;
					this.unit = unit;
		}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getNormalRange() {
		return normalRange;
	}

	public void setNormalRange(String normalRange) {
		this.normalRange = normalRange;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Override
    public String toString() {
        return "TestMaster [id=" + id +
               ", testName=" + testName +
               ", normalRange=" + normalRange +
               ", unit=" + unit + "]";
    }
	
}
