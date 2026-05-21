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

import com.OPD.dto.VisitsDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Patient;
import com.OPD.entities.Visits;
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
	public ResponseEntity<Visits> saveVisit(@Valid @RequestBody VisitsDto visitDto){
		Visits visit=new Visits();
		Doctor doctor=doctorService.getDoctorById(visitDto.getDoctorId());
		Patient patient=patientService.getById(visitDto.getPatientId());

		visit.setVisit_date(visitDto.getVisit_date());
		visit.setComplaints(visitDto.getComplaints());
		visit.setDiagnosis(visitDto.getDiagnosis());
		visit.setAdvice(visitDto.getAdvice());
		visit.setBp(visitDto.getBp());
		visit.setPulse(visitDto.getPulse());
		visit.setSaturation(visitDto.getSaturation());
		visit.setTemperature(visitDto.getTemperature());
		visit.setRespiration_rate(visitDto.getRespiration_rate());
		visit.setSugar(visitDto.getSugar());
		visit.setFasting_sugar(visitDto.getFasting_sugar());
		visit.setPp_sugar(visitDto.getPp_sugar());
		visit.setRandom_sugar(visitDto.getRandom_sugar());
		visit.setUrea_creatinine(visitDto.getUrea_creatinine());
		visit.setPast_history(visitDto.getPast_history());
		visit.setCurrent_medication(visitDto.getCurrent_medication());
		visit.setAdditional_notes(visitDto.getAdditional_notes());
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
		visit.setCreated_at(LocalDateTime.now());
		visit.setUpdated_at(LocalDateTime.now());
		visit.setFollowup_date(visitDto.getFollowup_date());
		
		visit.setDoctor(doctor);
		visit.setPatient(patient);
		
		Visits savedVisit=service.save(visit);
		return new ResponseEntity<>(savedVisit,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Visits>> getAllVisits(){
		List<Visits> visits=service.getAllVisits();
		return new ResponseEntity<>(visits,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Visits> getVisitById(@PathVariable("id") int id){
		Visits visit=service.getVisitsById(id);
		return new ResponseEntity<>(visit,HttpStatus.OK);
	}
	
	@GetMapping("doctor/{doctorId}")
	public ResponseEntity<List<Visits>> getVisitsByDoctor(@PathVariable("doctorId") int doctorId){
		List<Visits> visits=service.getVisitsByDoctorId(doctorId);
		return new ResponseEntity<>(visits,HttpStatus.OK);
	}
	
	@GetMapping("patient/{patientId}")
	public ResponseEntity<List<Visits>> getVisitsByPatient(@PathVariable("patientId") int patientId){
		List<Visits> visits=service.getVisitsByPatientId(patientId);
		return new ResponseEntity<>(visits,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Visits> updateVisitsById(@PathVariable("id") int id,@Valid @RequestBody VisitsDto visitDto){
		Visits visit=service.getVisitsById(id);
		
		Doctor doctor=doctorService.getDoctorById(visitDto.getDoctorId());
		Patient patient=patientService.getById(visitDto.getPatientId());

		visit.setVisit_date(visitDto.getVisit_date());
		visit.setComplaints(visitDto.getComplaints());
		visit.setDiagnosis(visitDto.getDiagnosis());
		visit.setAdvice(visitDto.getAdvice());
		visit.setBp(visitDto.getBp());
		visit.setPulse(visitDto.getPulse());
		visit.setSaturation(visitDto.getSaturation());
		visit.setTemperature(visitDto.getTemperature());
		visit.setRespiration_rate(visitDto.getRespiration_rate());
		visit.setSugar(visitDto.getSugar());
		visit.setFasting_sugar(visitDto.getFasting_sugar());
		visit.setPp_sugar(visitDto.getPp_sugar());
		visit.setRandom_sugar(visitDto.getRandom_sugar());
		visit.setUrea_creatinine(visitDto.getUrea_creatinine());
		visit.setPast_history(visitDto.getPast_history());
		visit.setCurrent_medication(visitDto.getCurrent_medication());
		visit.setAdditional_notes(visitDto.getAdditional_notes());
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
		visit.setUpdated_at(LocalDateTime.now());
		visit.setFollowup_date(visitDto.getFollowup_date());
		
		visit.setDoctor(doctor);
		visit.setPatient(patient);
		
		Visits updatedVisit=service.save(visit);
		return new ResponseEntity<>(updatedVisit,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVisitById(@PathVariable("id") int id){
		service.deleteVisitsById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
