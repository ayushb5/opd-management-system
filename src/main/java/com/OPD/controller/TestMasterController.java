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

import com.OPD.dto.TestMasterDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.TestMaster;
import com.OPD.services.DoctorService;
import com.OPD.services.TestMasterService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/test-master")
@CrossOrigin
public class TestMasterController {
	@Autowired
	private TestMasterService service;
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<TestMaster> saveTestMaster(@Valid @RequestBody TestMasterDto testMasterDto){
		TestMaster testMaster=new TestMaster();
		Doctor doctor=doctorService.getDoctorById(testMasterDto.getDoctorId());
		testMaster.setTest_name(testMasterDto.getTest_name());
		testMaster.setNormal_range(testMasterDto.getNormal_range());
		testMaster.setUnit(testMasterDto.getUnit());
		testMaster.setDoctor(doctor);
		
		TestMaster savedTestMaster=service.save(testMaster);
		return new ResponseEntity<>(savedTestMaster,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<TestMaster>> getAllTestMaster(){
		List<TestMaster> testMasters=service.getAllTestMaster();
		return new ResponseEntity<>(testMasters,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TestMaster> getTestMasterById(@PathVariable("id") int id){
		TestMaster testMaster=service.getTestMasterById(id);
		return new ResponseEntity<>(testMaster,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<List<TestMaster>> getTestMasterByDoctorId(@PathVariable("doctorId") int doctorId){
		List<TestMaster> testMasters=service.getTestMasterByDoctorId(doctorId);
		return new ResponseEntity<>(testMasters,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<TestMaster> updateTestMaster(@PathVariable("id") int id,@RequestBody TestMasterDto testMasterDto){
		TestMaster testMaster=service.getTestMasterById(id);
		Doctor doctor=doctorService.getDoctorById(testMasterDto.getDoctorId());
		
		testMaster.setTest_name(testMasterDto.getTest_name());
		testMaster.setNormal_range(testMasterDto.getNormal_range());
		testMaster.setUnit(testMasterDto.getUnit());
		testMaster.setDoctor(doctor);
		
		TestMaster updatedTestMaster=service.save(testMaster);
		return new ResponseEntity<>(updatedTestMaster,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTestMasterById(@PathVariable("id") int id){
		service.deleteTestMasterById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
