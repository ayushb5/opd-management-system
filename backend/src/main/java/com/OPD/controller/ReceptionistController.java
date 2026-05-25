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

import com.OPD.dto.ReceptionistDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Receptionist;
import com.OPD.services.DoctorService;
import com.OPD.services.ReceptionistService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/receptionist")
@CrossOrigin
public class ReceptionistController {
	@Autowired
	private ReceptionistService service;
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<Receptionist> saveReceptionist(@Valid @RequestBody ReceptionistDto receptionistDto){
		Receptionist receptionist=new Receptionist();
		Doctor doctor=doctorService.getDoctorById(receptionistDto.getDoctorId());
		
		receptionist.setName(receptionistDto.getName());
		receptionist.setEmail(receptionistDto.getEmail());
		receptionist.setPassword(receptionistDto.getPassword());
		receptionist.setMobileno(receptionistDto.getMobileno());
		receptionist.setStatus(receptionistDto.getStatus());
		receptionist.setDoctor(doctor);
		receptionist.setCreated_at(LocalDateTime.now());
		receptionist.setUpdated_at(LocalDateTime.now());
		
		Receptionist savedReceptionist=service.saveReceptionist(receptionist);
		return new ResponseEntity<>(savedReceptionist,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Receptionist>> getAllReceptionist(){
		List<Receptionist> receptionists=service.getAllReceptionist();
		return new ResponseEntity<>(receptionists,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Receptionist> getReceptionistById(@PathVariable("id") int id){
		Receptionist receptionist=service.getReceptionistById(id);
		return new ResponseEntity<>(receptionist,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Receptionist>> getReceptionistByDoctorId(@PathVariable("doctorId") int doctorId){
		List<Receptionist> receptionists=service.getReceptionistByDoctorId(doctorId);
		return new ResponseEntity<>(receptionists, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Receptionist> updateReceptionistById(@PathVariable("id") int id, @Valid @RequestBody ReceptionistDto receptionistDto){
		Receptionist receptionist=service.getReceptionistById(id);
		Doctor doctor=doctorService.getDoctorById(receptionistDto.getDoctorId());
		
		receptionist.setName(receptionistDto.getName());
		receptionist.setEmail(receptionistDto.getEmail());
		receptionist.setPassword(receptionistDto.getPassword());
		receptionist.setMobileno(receptionistDto.getMobileno());
		receptionist.setStatus(receptionistDto.getStatus());
		receptionist.setDoctor(doctor);
		receptionist.setUpdated_at(LocalDateTime.now());
		
		Receptionist updatedReceptionist=service.saveReceptionist(receptionist);
		return new ResponseEntity<>(updatedReceptionist,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReceptionistById(@PathVariable("id") int id){
		service.deleteReceptionistById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
