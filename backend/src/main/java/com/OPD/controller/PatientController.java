package com.OPD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OPD.dto.PatientDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Patient;
import com.OPD.services.DoctorService;
import com.OPD.services.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {
	@Autowired
	private PatientService service;
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<Patient> savePatient(@Valid @RequestBody PatientDto patientDto){
		Patient patient=new Patient();
		Doctor doctor=doctorService.getDoctorById(patientDto.getDoctorId());
		
		patient.setPatientName(patientDto.getPatientName());
		patient.setAge(patientDto.getAge());
		patient.setGender(patientDto.getGender());
		patient.setMobileNo(patientDto.getMobileNo());
		patient.setAddress(patientDto.getAddress());
		patient.setBloodGroup(patientDto.getBloodGroup());
		patient.setHeight(patientDto.getHeight());
		patient.setSmoking(patientDto.getSmoking());
		patient.setAlcohol(patientDto.getAlcohol());
		patient.setTobacco(patientDto.getTobacco());
		patient.setDoctor(doctor);
		
		Patient savedPatient=service.save(patient);
		
		return new ResponseEntity<>(savedPatient,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Patient>> getAllPatients(){
		List<Patient> patients=service.getAll();
		return new ResponseEntity<>(patients,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Patient> getPatientById(@PathVariable("id") Integer id){
		Patient patient=service.getById(id);
		return new ResponseEntity<>(patient,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Patient>> getPatientByDoctorId(@PathVariable("doctorId") Integer doctorId){
		List<Patient> patients=service.getPatientByDoctorId(doctorId);
		return new ResponseEntity<>(patients,HttpStatus.OK);
	}
	
	@PutMapping("/{patientId}")
	public ResponseEntity<Patient> updatePatientById(@PathVariable("patientId") Integer patientId,@Valid @RequestBody PatientDto patientDto){
		Patient patient=service.getById(patientId);
		Doctor doctor=doctorService.getDoctorById(patientDto.getDoctorId());
		patient.setPatientName(patientDto.getPatientName());
		patient.setAge(patientDto.getAge());
		patient.setGender(patientDto.getGender());
		patient.setMobileNo(patientDto.getMobileNo());
		patient.setAddress(patientDto.getAddress());
		patient.setBloodGroup(patientDto.getBloodGroup());
		patient.setHeight(patientDto.getHeight());
		patient.setSmoking(patientDto.getSmoking());
		patient.setAlcohol(patientDto.getAlcohol());
		patient.setTobacco(patientDto.getTobacco());
		patient.setDoctor(doctor);
		
		Patient savedPatient=service.save(patient);
		return new ResponseEntity<>(savedPatient,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePatientById(@PathVariable("id") Integer id){
		service.deletePatientById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
