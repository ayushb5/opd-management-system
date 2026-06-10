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
@Table(name="medicines")
public class Medicine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(nullable = false)
    private String medicineName;

    @Column(nullable = false)
    private String type;

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

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Medicine(Integer id, Doctor doctor, String medicineName, String type) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.medicineName = medicineName;
		this.type = type;
	}
	
	@Override
	public String toString() {
	    return "Medicine [id=" + id +
	           ", medicineName=" + medicineName +
	           ", type=" + type + "]";
	}

	public Medicine() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
