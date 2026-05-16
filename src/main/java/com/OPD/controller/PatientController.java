package com.OPD.controller;

import java.time.LocalDateTime;
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

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {
	@Autowired
	private PatientService service;
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<Patient> savePatient(@RequestBody PatientDto patientDto){
		Patient patient=new Patient();
		Doctor doctor=doctorService.getDoctorById(patientDto.getDoctorId());
		if(doctor==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		patient.setPatient_name(patientDto.getPatient_name());
		patient.setAge(patientDto.getAge());
		patient.setGender(patientDto.getGender());
		patient.setMobileno(patientDto.getMobileno());
		patient.setAddress(patientDto.getAddress());
		patient.setBlood_group(patientDto.getBlood_group());
		patient.setHeight(patientDto.getHeight());
		patient.setSmoking(patientDto.getSmoking());
		patient.setAlcohol(patientDto.getAlcohol());
		patient.setTobacco(patientDto.getTobacco());
		patient.setCreated_at(LocalDateTime.now());
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
	public ResponseEntity<Patient> getPatientById(@PathVariable("id") int id){
		Patient patient=service.getById(id);
		if(patient==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(patient,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Patient>> getPatientByDoctorId(@PathVariable("doctorId") int doctorId){
		List<Patient> patients=service.getPatientByDoctorId(doctorId);
		return new ResponseEntity<>(patients,HttpStatus.OK);
	}
	
	@PutMapping("/{patientId}")
	public ResponseEntity<Patient> updatePatientById(@PathVariable("patientId") int patientId,@RequestBody PatientDto patientDto){
		Patient patient=service.getById(patientId);
		Doctor doctor=doctorService.getDoctorById(patientDto.getDoctorId());
		if(patient==null || doctor==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		patient.setPatient_name(patientDto.getPatient_name());
		patient.setAge(patientDto.getAge());
		patient.setGender(patientDto.getGender());
		patient.setMobileno(patientDto.getMobileno());
		patient.setAddress(patientDto.getAddress());
		patient.setBlood_group(patientDto.getBlood_group());
		patient.setHeight(patientDto.getHeight());
		patient.setSmoking(patientDto.getSmoking());
		patient.setAlcohol(patientDto.getAlcohol());
		patient.setTobacco(patientDto.getTobacco());
		patient.setDoctor(doctor);
		
		Patient savedPatient=service.save(patient);
		return new ResponseEntity<>(savedPatient,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePatientById(@PathVariable("id") int id){
		Patient patient=service.getById(id);
		if(patient==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		service.deletePatientById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
