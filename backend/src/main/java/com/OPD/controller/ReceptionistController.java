package com.OPD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.OPD.dto.ReceptionistDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Receptionist;
import com.OPD.exception.DuplicateResourceException;
import com.OPD.repository.ReceptionistRepository;
import com.OPD.response.DashboardResponse;
import com.OPD.services.DashboardService;
import com.OPD.services.DoctorService;
import com.OPD.services.ReceptionistService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/receptionists")
@CrossOrigin
public class ReceptionistController {
	@Autowired
	private ReceptionistRepository repository;
	@Autowired
	private ReceptionistService service;
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private DashboardService dashboardService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping
	public ResponseEntity<Receptionist> saveReceptionist(@Valid @RequestBody ReceptionistDto receptionistDto){
		Receptionist receptionist=new Receptionist();
		Doctor doctor=doctorService.getDoctorById(receptionistDto.getDoctorId());
		
		receptionist.setName(receptionistDto.getName());
		if(repository.findByEmail(receptionistDto.getEmail()).isPresent()) {
		    throw new DuplicateResourceException("Email already exists");
		}
		receptionist.setEmail(receptionistDto.getEmail());
		receptionist.setMobileNo(receptionistDto.getMobileNo());
		receptionist.setStatus(receptionistDto.getStatus());
		receptionist.setDoctor(doctor);
		
		if (receptionistDto.getPassword() != null &&
			!receptionistDto.getPassword().isBlank()) {

			receptionist.setPassword(
			passwordEncoder.encode(receptionistDto.getPassword()));
		}
		
		Receptionist savedReceptionist=service.save(receptionist);
		return new ResponseEntity<>(savedReceptionist,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<Page<Receptionist>> getAllReceptionists(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "") String search){
		Page<Receptionist> receptionists=service.getAllReceptionists(page,size,search);
		return new ResponseEntity<>(receptionists,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Receptionist> getReceptionistById(@PathVariable("id") Integer id){
		Receptionist receptionist=service.getReceptionistById(id);
		return new ResponseEntity<>(receptionist,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Receptionist>> getReceptionistsByDoctorId(@PathVariable("doctorId") Integer doctorId){
		List<Receptionist> receptionists=service.getReceptionistsByDoctorId(doctorId);
		return new ResponseEntity<>(receptionists, HttpStatus.OK);
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<DashboardResponse> getReceptionistDashboard() {
	    return ResponseEntity.ok(dashboardService.getReceptionistDashboard());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Receptionist> updateReceptionistById(@PathVariable("id") Integer id, @Valid @RequestBody ReceptionistDto receptionistDto){
		Receptionist receptionist=service.getReceptionistById(id);
		Doctor doctor=doctorService.getDoctorById(receptionistDto.getDoctorId());
		
		receptionist.setName(receptionistDto.getName());
		receptionist.setEmail(receptionistDto.getEmail());
		receptionist.setMobileNo(receptionistDto.getMobileNo());
		receptionist.setStatus(receptionistDto.getStatus());
		receptionist.setDoctor(doctor);
		
		Receptionist updatedReceptionist=service.save(receptionist);
		return new ResponseEntity<>(updatedReceptionist,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReceptionistById(@PathVariable("id") Integer id){
		service.deleteReceptionistById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
