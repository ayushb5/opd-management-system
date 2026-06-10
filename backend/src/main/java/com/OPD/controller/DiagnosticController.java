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

import com.OPD.dto.DiagnosticDto;
import com.OPD.entities.Diagnostic;
import com.OPD.entities.Doctor;
import com.OPD.entities.Visit;
import com.OPD.services.DiagnosticService;
import com.OPD.services.DoctorService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/diagnostics")
@CrossOrigin
public class DiagnosticController {
	@Autowired
	private DiagnosticService service;
	@Autowired
	private VisitService visitService;
	@Autowired 
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<Diagnostic> saveDiagnostic(@Valid @RequestBody DiagnosticDto diagnosticDto){
		Diagnostic diagnostic=new Diagnostic();
		Visit visit=visitService.getVisitById(diagnosticDto.getVisitId());
		Doctor doctor=doctorService.getDoctorById(diagnosticDto.getDoctorId());
		
		diagnostic.setName(diagnosticDto.getName());
		diagnostic.setVisit(visit);
		diagnostic.setDoctor(doctor);
		
		Diagnostic savedDiagnostic=service.save(diagnostic);
		
		return new ResponseEntity<>(savedDiagnostic,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Diagnostic>> getAllDiagnostics(){
		List<Diagnostic> diagnostics=service.getAllDiagnostics();
		return new ResponseEntity<>(diagnostics,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Diagnostic> getDiagnosticById(@PathVariable("id") Integer id){
		Diagnostic diagnostic=service.getDiagnosticById(id);
	
		return new ResponseEntity<>(diagnostic,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<Diagnostic>> getDiagnosticsByVisitId(@PathVariable("visitId") Integer visitId){
		List<Diagnostic> diagnostics=service.getDiagnosticsByVisitId(visitId);
		return new ResponseEntity<>(diagnostics,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Diagnostic>> getDiagnosticsByDoctorId(@PathVariable("doctorId") Integer doctorId) {
		List<Diagnostic> diagnostics=service.getDiagnosticsByDoctorId(doctorId);
		return new ResponseEntity<>(diagnostics,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Diagnostic> updateDiagnosticById(@PathVariable("id") Integer id,@Valid @RequestBody DiagnosticDto diagnosticDto){
		Diagnostic diagnostic=service.getDiagnosticById(id);
		Visit visit=visitService.getVisitById(diagnosticDto.getVisitId());
		Doctor doctor=doctorService.getDoctorById(diagnosticDto.getDoctorId());
		
		diagnostic.setName(diagnosticDto.getName());
		diagnostic.setVisit(visit);
		diagnostic.setDoctor(doctor);
		
		Diagnostic updatedDiagnostic=service.save(diagnostic);
		return new ResponseEntity<>(updatedDiagnostic,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDiagnosticById(@PathVariable("id") Integer id){
		service.deleteDiagnosticById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
