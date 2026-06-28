package com.OPD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
import com.OPD.exception.DuplicateResourceException;
import com.OPD.repository.DoctorRepository;
import com.OPD.response.DashboardResponse;
import com.OPD.services.DashboardService;
import com.OPD.services.DoctorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/doctors")
@CrossOrigin
public class DoctorController {
	@Autowired
	private DoctorRepository repository;
	@Autowired
	private DoctorService service;
	@Autowired
	private DashboardService dashboardService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping
	public ResponseEntity<Doctor> saveDoctor(@Valid @RequestBody DoctorDto doctorDto){
		Doctor doctor=new Doctor();
		doctor.setName(doctorDto.getName());
		if(repository.findByEmail(doctorDto.getEmail()).isPresent()) {
		    throw new DuplicateResourceException("Email already exists");
		}
		doctor.setEmail(doctorDto.getEmail());
		
		doctor.setPassword(passwordEncoder.encode(doctorDto.getPassword()));
		doctor.setSpecialization(doctorDto.getSpecialization());
		doctor.setClinicName(doctorDto.getClinicName());
		doctor.setAddress(doctorDto.getAddress());
		doctor.setMobileNo(doctorDto.getMobileNo());
		
		Doctor savedDoctor=service.save(doctor);
		
		return new ResponseEntity<>(savedDoctor,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Doctor>> getAllDoctors(){
		List<Doctor> doctors=service.getAllDoctors();
		return new ResponseEntity<>(doctors,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") Integer id){
		Doctor doctor=service.getDoctorById(id);
		return new ResponseEntity<>(doctor,HttpStatus.OK);
	}
	
	@GetMapping("/dashboard/{doctorId}")
	public ResponseEntity<DashboardResponse> getDashboard(@PathVariable("doctorId") Integer doctorId){
		return ResponseEntity.ok(dashboardService.getDoctorDashboard(doctorId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Doctor> updateDoctorById(@PathVariable("id") Integer id,@Valid @RequestBody DoctorDto doctorDto){
		Doctor doctor=service.getDoctorById(id);

		doctor.setName(doctorDto.getName());
		doctor.setEmail(doctorDto.getEmail());
		doctor.setSpecialization(doctorDto.getSpecialization());
		doctor.setClinicName(doctorDto.getClinicName());
		doctor.setAddress(doctorDto.getAddress());
		doctor.setMobileNo(doctorDto.getMobileNo());
		doctor.setStatus(doctorDto.getStatus());
		
		Doctor updatedDoctor=service.save(doctor);
		return new ResponseEntity<>(updatedDoctor,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDoctor(@PathVariable("id") Integer id){
		service.deleteDoctorById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
