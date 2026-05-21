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

import com.OPD.dto.DiagnosticDto;
import com.OPD.entities.Diagnostics;
import com.OPD.entities.Doctor;
import com.OPD.entities.Visits;
import com.OPD.services.DiagnosticService;
import com.OPD.services.DoctorService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/diagnostic")
@CrossOrigin
public class DiagnosticController {
	@Autowired
	private DiagnosticService service;
	@Autowired
	private VisitService visitService;
	@Autowired 
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<Diagnostics> saveDiagnostic(@Valid @RequestBody DiagnosticDto diagnosticDto){
		Diagnostics diagnostic=new Diagnostics();
		Visits visit=visitService.getVisitsById(diagnosticDto.getVisitId());
		Doctor doctor=doctorService.getDoctorById(diagnosticDto.getDoctorId());
		
		if(visit==null || doctor==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		diagnostic.setName(diagnosticDto.getName());
		diagnostic.setVisit(visit);
		diagnostic.setDoctor(doctor);
		diagnostic.setCreated_at(LocalDateTime.now());
		
		Diagnostics savedDiagnostic=service.save(diagnostic);
		
		return new ResponseEntity<>(savedDiagnostic,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Diagnostics>> getAllDiagnostic(){
		List<Diagnostics> diagnostics=service.getAllDiagnostic();
		return new ResponseEntity<>(diagnostics,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Diagnostics> getDiagnosticById(@PathVariable("id") int id){
		Diagnostics diagnostic=service.getDiagnosticById(id);
		if(diagnostic==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(diagnostic,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<Diagnostics>> getDiagnosticByVisitId(@PathVariable("visitId") int visitId){
		List<Diagnostics> diagnostics=service.getDiagnosticByVisitId(visitId);
		return new ResponseEntity<>(diagnostics,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Diagnostics>> getDiagnosticByDoctorId(@PathVariable("doctorId") int doctorId) {
		List<Diagnostics> diagnostics=service.getDiagnosticByDoctorId(doctorId);
		return new ResponseEntity<>(diagnostics,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Diagnostics> updateDiagnosticById(@PathVariable("id") int id,@RequestBody DiagnosticDto diagnosticDto){
		Diagnostics diagnostic=service.getDiagnosticById(id);
		Visits visit=visitService.getVisitsById(diagnosticDto.getVisitId());
		Doctor doctor=doctorService.getDoctorById(diagnosticDto.getDoctorId());
		
		if(diagnostic==null||visit==null||doctor==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		diagnostic.setName(diagnosticDto.getName());
		diagnostic.setVisit(visit);
		diagnostic.setDoctor(doctor);
		
		Diagnostics updatedDiagnostic=service.save(diagnostic);
		return new ResponseEntity<>(updatedDiagnostic,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDiagnosticById(@PathVariable("id") int id){
		Diagnostics diagnostic=service.getDiagnosticById(id);
		if(diagnostic==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		service.deleteDiagnosticById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
