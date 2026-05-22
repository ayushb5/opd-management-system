package com.OPD.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="patients")
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	private String patient_name;
	private int age;
	public enum Gender{
		MALE,
		FEMALE,
		OTHER
	}
	@Enumerated(EnumType.STRING)
	private Gender gender;
	private String mobileno;
	private String address;
	private String blood_group;
	private String height;
	private String smoking;
	private String alcohol;
	private String tobacco;
	private LocalDateTime created_at;
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
	public String getPatient_name() {
		return patient_name;
	}
	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getMobileno() {
		return mobileno;
	}
	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getBlood_group() {
		return blood_group;
	}
	public void setBlood_group(String blood_group) {
		this.blood_group = blood_group;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getSmoking() {
		return smoking;
	}
	public void setSmoking(String smoking) {
		this.smoking = smoking;
	}
	public String getAlcohol() {
		return alcohol;
	}
	public void setAlcohol(String alcohol) {
		this.alcohol = alcohol;
	}
	public String getTobacco() {
		return tobacco;
	}
	public void setTobacco(String tobacco) {
		this.tobacco = tobacco;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}
	public Patient(int id, Doctor doctor, String patient_name, int age, Gender gender, String mobileno, String address,
			String blood_group, String height, String smoking, String alcohol, String tobacco,
			LocalDateTime created_at) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.patient_name = patient_name;
		this.age = age;
		this.gender = gender;
		this.mobileno = mobileno;
		this.address = address;
		this.blood_group = blood_group;
		this.height = height;
		this.smoking = smoking;
		this.alcohol = alcohol;
		this.tobacco = tobacco;
		this.created_at = created_at;
	}
	@Override
	public String toString() {
		return "Patient [id=" + id + ", doctor=" + doctor + ", patient_name=" + patient_name + ", age=" + age
				+ ", gender=" + gender + ", mobileno=" + mobileno + ", address=" + address + ", blood_group="
				+ blood_group + ", height=" + height + ", smoking=" + smoking + ", alcohol=" + alcohol + ", tobacco="
				+ tobacco + ", created_at=" + created_at + "]";
	}
	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
