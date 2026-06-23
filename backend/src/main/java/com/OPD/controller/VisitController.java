package com.OPD.controller;

import java.time.LocalDate;
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

import com.OPD.dto.VisitDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Patient;
import com.OPD.entities.Visit;
import com.OPD.services.DoctorService;
import com.OPD.services.PatientService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/visits")
@CrossOrigin
public class VisitController {
	@Autowired
	private VisitService service;
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private PatientService patientService;
	
	@PostMapping
	public ResponseEntity<Visit> saveVisit(@Valid @RequestBody VisitDto visitDto){
		Visit visit=new Visit();
		Doctor doctor=doctorService.getDoctorById(visitDto.getDoctorId());
		Patient patient=patientService.getById(visitDto.getPatientId());

		visit.setVisitDate(visitDto.getVisitDate());
		visit.setComplaints(visitDto.getComplaints());
		visit.setStatus(visitDto.getStatus());
		visit.setDiagnosis(visitDto.getDiagnosis());
		visit.setAdvice(visitDto.getAdvice());
		visit.setBp(visitDto.getBp());
		visit.setPulse(visitDto.getPulse());
		visit.setSaturation(visitDto.getSaturation());
		visit.setTemperature(visitDto.getTemperature());
		visit.setRespirationRate(visitDto.getRespirationRate());
		visit.setFastingSugar(visitDto.getFastingSugar());
		visit.setPpSugar(visitDto.getPpSugar());
		visit.setRandomSugar(visitDto.getRandomSugar());
		visit.setUreaCreatinine(visitDto.getUreaCreatinine());
		visit.setPastHistory(visitDto.getPastHistory());
		visit.setCurrentMedication(visitDto.getCurrentMedication());
		visit.setAdditionalNotes(visitDto.getAdditionalNotes());
		visit.setWeight(visitDto.getWeight());
		visit.setEdema(visitDto.getEdema());
		visit.setPallor(visitDto.getPallor());
		visit.setJaundice(visitDto.getJaundice());
		visit.setCvs(visitDto.getCvs());
		visit.setRs(visitDto.getRs());
		visit.setPa(visitDto.getPa());
		visit.setCns(visitDto.getCns());
		visit.setHb(visitDto.getHb());
		visit.setEcg(visitDto.getEcg());
		visit.setFollowupDate(visitDto.getFollowupDate());
		
		visit.setDoctor(doctor);
		visit.setPatient(patient);
		
		Visit savedVisit=service.save(visit);
		return new ResponseEntity<>(savedVisit,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Visit>> getAllVisits(){
		List<Visit> visits=service.getAllVisits();
		return new ResponseEntity<>(visits,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Visit> getVisitById(@PathVariable("id") Integer id){
		Visit visit=service.getVisitById(id);
		return new ResponseEntity<>(visit,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Visit>> getVisitsByDoctor(@PathVariable("doctorId") Integer doctorId){
		List<Visit> visits=service.getVisitsByDoctorId(doctorId);
		return new ResponseEntity<>(visits,HttpStatus.OK);
	}
	
	@GetMapping("/patient/{patientId}")
	public ResponseEntity<List<Visit>> getVisitsByPatient(@PathVariable("patientId") Integer patientId){
		List<Visit> visits=service.getVisitsByPatientId(patientId);
		return new ResponseEntity<>(visits,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}/date/{visitDate}")
	public ResponseEntity<List<Visit>> getVisitsByDoctorIdAndVisitDate(
	        @PathVariable Integer doctorId,
	        @PathVariable LocalDate visitDate) {

	    return ResponseEntity.ok(
	        service.getVisitsByDoctorIdAndVisitDate(
	            doctorId,
	            visitDate
	        )
	    );
	}
	
	@GetMapping("/doctor/{doctorId}/follow-ups")
	public ResponseEntity<List<Visit>> getDoctorFollowUps(@PathVariable Integer doctorId){
		return ResponseEntity.ok(service.getDoctorFollowUps(doctorId));
	}
	
	@GetMapping("/doctor/{doctorId}/follow-ups/today")
	public ResponseEntity<List<Visit>> getTodayFollowUps(@PathVariable Integer doctorId){
		return ResponseEntity.ok(service.getTodayFollowUps(doctorId));
	}
	
	@GetMapping("/doctor/{doctorId}/follow-ups/overdue")
	public ResponseEntity<List<Visit>> getOverdueFollowUps(@PathVariable Integer doctorId){
		return ResponseEntity.ok(service.getOverdueFollowUps(doctorId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Visit> updateVisitById(@PathVariable("id") Integer id,@Valid @RequestBody VisitDto visitDto){
		Visit visit=service.getVisitById(id);
		
		Doctor doctor=doctorService.getDoctorById(visitDto.getDoctorId());
		Patient patient=patientService.getById(visitDto.getPatientId());

		visit.setVisitDate(visitDto.getVisitDate());
		visit.setComplaints(visitDto.getComplaints());
		visit.setStatus(visitDto.getStatus());
		visit.setDiagnosis(visitDto.getDiagnosis());
		visit.setAdvice(visitDto.getAdvice());
		visit.setBp(visitDto.getBp());
		visit.setPulse(visitDto.getPulse());
		visit.setSaturation(visitDto.getSaturation());
		visit.setTemperature(visitDto.getTemperature());
		visit.setRespirationRate(visitDto.getRespirationRate());
		visit.setFastingSugar(visitDto.getFastingSugar());
		visit.setPpSugar(visitDto.getPpSugar());
		visit.setRandomSugar(visitDto.getRandomSugar());
		visit.setUreaCreatinine(visitDto.getUreaCreatinine());
		visit.setPastHistory(visitDto.getPastHistory());
		visit.setCurrentMedication(visitDto.getCurrentMedication());
		visit.setAdditionalNotes(visitDto.getAdditionalNotes());
		visit.setWeight(visitDto.getWeight());
		visit.setEdema(visitDto.getEdema());
		visit.setPallor(visitDto.getPallor());
		visit.setJaundice(visitDto.getJaundice());
		visit.setCvs(visitDto.getCvs());
		visit.setRs(visitDto.getRs());
		visit.setPa(visitDto.getPa());
		visit.setCns(visitDto.getCns());
		visit.setHb(visitDto.getHb());
		visit.setEcg(visitDto.getEcg());
		visit.setFollowupDate(visitDto.getFollowupDate());
		
		visit.setDoctor(doctor);
		visit.setPatient(patient);
		
		Visit updatedVisit=service.save(visit);
		return new ResponseEntity<>(updatedVisit,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVisitById(@PathVariable("id") Integer id){
		service.deleteVisitById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
