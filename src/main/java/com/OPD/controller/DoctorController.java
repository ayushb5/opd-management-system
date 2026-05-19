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

import com.OPD.dto.DoctorDto;
import com.OPD.entities.Doctor;
import com.OPD.services.DoctorService;

@RestController
@RequestMapping("/doctor")
@CrossOrigin
public class DoctorController {
	
	@Autowired
	private DoctorService service;
	
	@PostMapping
	public ResponseEntity<Doctor> saveDoctor(@RequestBody DoctorDto doctorDto){
		Doctor doctor=new Doctor();
		doctor.setName(doctorDto.getName());
		doctor.setEmail(doctorDto.getEmail());
		doctor.setPassword(doctorDto.getPassword());
		doctor.setSpecialization(doctorDto.getSpecialization());
		doctor.setClinic_name(doctorDto.getClinic_name());
		doctor.setAddress(doctorDto.getAddress());
		doctor.setMobileno(doctorDto.getMobileno());
		doctor.setToken(doctorDto.getToken());
		doctor.setStatus(doctorDto.getStatus());
		doctor.setCreated_at(LocalDateTime.now());
		doctor.setUpdated_at(LocalDateTime.now());
		
		Doctor savedDoctor=service.save(doctor);
		
		return new ResponseEntity<>(savedDoctor,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Doctor>> getAllDoctors(){
		List<Doctor> doctors=service.getAllDoctors();
		return new ResponseEntity<>(doctors,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") int id){
		Doctor doctor=service.getDoctorById(id);
		return new ResponseEntity<>(doctor,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Doctor> updateDoctorById(@PathVariable("id") int id, @RequestBody DoctorDto doctorDto){
		Doctor doctor=service.getDoctorById(id);

		doctor.setName(doctorDto.getName());
		doctor.setEmail(doctorDto.getEmail());
		doctor.setPassword(doctorDto.getPassword());
		doctor.setSpecialization(doctorDto.getSpecialization());
		doctor.setClinic_name(doctorDto.getClinic_name());
		doctor.setAddress(doctorDto.getAddress());
		doctor.setMobileno(doctorDto.getMobileno());
		doctor.setToken(doctorDto.getToken());
		doctor.setStatus(doctorDto.getStatus());
		doctor.setUpdated_at(LocalDateTime.now());
		
		Doctor updatedDoctor=service.save(doctor);
		return new ResponseEntity<>(updatedDoctor,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDoctor(@PathVariable("id") int id){
		service.deleteDoctorById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
