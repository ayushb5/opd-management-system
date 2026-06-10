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

import com.OPD.dto.ReferralCenterDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.ReferralCenter;
import com.OPD.services.DoctorService;
import com.OPD.services.ReferralCenterService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/referral-centers")
@CrossOrigin
public class ReferralCenterController {
	@Autowired
	private ReferralCenterService service;
	@Autowired
	private DoctorService doctorService;

	@PostMapping
	public ResponseEntity<ReferralCenter> saveReferralCenter(@Valid @RequestBody ReferralCenterDto referralCenterDto){
		ReferralCenter referralCenter=new ReferralCenter();
		Doctor doctor=doctorService.getDoctorById(referralCenterDto.getDoctorId());
		referralCenter.setName(referralCenterDto.getName());
		referralCenter.setType(referralCenterDto.getType());
		referralCenter.setContactInfo(referralCenterDto.getContactInfo());
		referralCenter.setAddress(referralCenterDto.getAddress());
		referralCenter.setDoctor(doctor);
		
		ReferralCenter savedReferralCenter=service.save(referralCenter);
		return new ResponseEntity<>(savedReferralCenter,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<ReferralCenter>> getAllReferralCenters(){
		List<ReferralCenter> referralCenters=service.getAllReferralCenters();
		return new ResponseEntity<>(referralCenters,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ReferralCenter> getReferralCenterById(@PathVariable("id") Integer id){
		ReferralCenter referralCenter=service.getReferralCenterById(id);
		return new ResponseEntity<>(referralCenter,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<ReferralCenter>> getReferralCentersByDoctorId(@PathVariable("doctorId") Integer doctorId){
		List<ReferralCenter> referralCenters=service.getReferralCentersByDoctorId(doctorId);
		return new ResponseEntity<>(referralCenters,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ReferralCenter> updateReferralCenterById(@PathVariable("id") Integer id,@Valid @RequestBody ReferralCenterDto referralCenterDto){
		ReferralCenter referralCenter=service.getReferralCenterById(id);
		Doctor doctor=doctorService.getDoctorById(referralCenterDto.getDoctorId());
		
		referralCenter.setName(referralCenterDto.getName());
		referralCenter.setType(referralCenterDto.getType());
		referralCenter.setContactInfo(referralCenterDto.getContactInfo());
		referralCenter.setAddress(referralCenterDto.getAddress());
		referralCenter.setDoctor(doctor);
		
		ReferralCenter updatedReferralCenter=service.save(referralCenter);
		
		return new ResponseEntity<>(updatedReferralCenter,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReferralCenterById(@PathVariable("id") Integer id){
		service.deleteReferralCenterById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
