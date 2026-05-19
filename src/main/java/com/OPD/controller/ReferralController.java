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

import com.OPD.dto.ReferralDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Patient;
import com.OPD.entities.Referral;
import com.OPD.entities.ReferralCenter;
import com.OPD.entities.Visits;
import com.OPD.services.DoctorService;
import com.OPD.services.PatientService;
import com.OPD.services.ReferralCenterService;
import com.OPD.services.ReferralService;
import com.OPD.services.VisitService;

@RestController
@RequestMapping("/referral")
@CrossOrigin
public class ReferralController {
	@Autowired
	private ReferralService service;
	@Autowired
	private VisitService visitService;
	@Autowired
	private PatientService patientService;
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private ReferralCenterService referralCenterService;
	
	@PostMapping
	public ResponseEntity<Referral> saveReferral(@RequestBody ReferralDto referralDto){
		Referral referral=new Referral();
		Visits visit=visitService.getVisitsById(referralDto.getVisitId());
		Patient patient=patientService.getById(referralDto.getPatientId());
		Doctor doctor=doctorService.getDoctorById(referralDto.getDoctorId());
		ReferralCenter referralCenter=referralCenterService.getReferralCenterById(referralDto.getReferralCenterId());
		
		if(visit==null||patient==null||doctor==null||referralCenter==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		referral.setNote_type(referralDto.getNote_type());
		referral.setReason(referralDto.getReason());
		referral.setDetails(referralDto.getDetails());
		referral.setCreated_at(LocalDateTime.now());
		referral.setVisit(visit);
		referral.setPatient(patient);
		referral.setDoctor(doctor);
		referral.setReferral_centers(referralCenter);
		
		Referral savedReferral=service.save(referral);
		return new ResponseEntity<>(savedReferral,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Referral>> getAllReferrals(){
		List<Referral> referrals=service.getAllReferrals();
		return new ResponseEntity<>(referrals,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Referral> getReferralById(@PathVariable("id") int id){
		Referral referral=service.getReferralById(id);
		if(referral==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(referral,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<Referral>> getReferralByVisitId(@PathVariable("visitId") int visitId){
		List<Referral> referrals=service.getReferralsByVisitId(visitId);
		
		return new ResponseEntity<>(referrals,HttpStatus.OK);
	}
	
	@GetMapping("/patient/{patientId}")
	public ResponseEntity<List<Referral>> getReferralByPatientId(@PathVariable("patientId") int patientId){
		List<Referral> referrals=service.getReferralsByPatientId(patientId);
		return new ResponseEntity<>(referrals,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<Referral>> getReferralByDoctorId(@PathVariable("doctorId") int doctorId){
		List<Referral> referrals=service.getReferralsByDoctorId(doctorId);
		return new ResponseEntity<>(referrals,HttpStatus.OK);
	}
	
	@GetMapping("/referral-center/{referralCenterId}")
	public ResponseEntity<List<Referral>> getReferralsByReferralCenterId(@PathVariable("referralCenterId") int referralCenterId){
		List<Referral> referrals=service.getReferralsByReferralCenterId(referralCenterId);
		return new ResponseEntity<>(referrals,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Referral> saveReferral(@PathVariable("id") int id,@RequestBody ReferralDto referralDto){
		Referral referral=service.getReferralById(id);
		Visits visit=visitService.getVisitsById(referralDto.getVisitId());
		Patient patient=patientService.getById(referralDto.getPatientId());
		Doctor doctor=doctorService.getDoctorById(referralDto.getDoctorId());
		ReferralCenter referralCenter=referralCenterService.getReferralCenterById(referralDto.getReferralCenterId());
		
		if(referral==null||visit==null||patient==null||doctor==null||referralCenter==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		referral.setNote_type(referralDto.getNote_type());
		referral.setReason(referralDto.getReason());
		referral.setDetails(referralDto.getDetails());
		referral.setVisit(visit);
		referral.setPatient(patient);
		referral.setDoctor(doctor);
		referral.setReferral_centers(referralCenter);
		
		Referral updatedReferral=service.save(referral);
		return new ResponseEntity<>(updatedReferral,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReferral(@PathVariable("id") int id){
		Referral referral=service.getReferralById(id);
		if(referral==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		service.deleteReferralsById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
