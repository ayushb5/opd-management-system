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

import com.OPD.dto.PathologyTestDto;
import com.OPD.entities.PathologyTest;
import com.OPD.entities.TestMaster;
import com.OPD.entities.Visits;
import com.OPD.services.PathologyTestService;
import com.OPD.services.TestMasterService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/pathology-test")
@CrossOrigin
public class PathologyTestController {
	
	@Autowired
	private PathologyTestService service;
	@Autowired
	private VisitService visitService;
	@Autowired TestMasterService testMasterService;
	
	@PostMapping
	public ResponseEntity<PathologyTest> savePathologyTest(@Valid @RequestBody PathologyTestDto pathologyTestDto){
		PathologyTest pathologyTest=new PathologyTest();
		Visits visit=visitService.getVisitsById(pathologyTestDto.getVisitId());
		TestMaster testMaster=testMasterService.getTestMasterById(pathologyTestDto.getTestId());
				
		pathologyTest.setResult(pathologyTestDto.getResult());
		pathologyTest.setRemarks(pathologyTestDto.getRemarks());
		pathologyTest.setReport_file(pathologyTestDto.getReport_file());
		pathologyTest.setCreated_at(LocalDateTime.now());
		pathologyTest.setVisit(visit);
		pathologyTest.setTest_masters(testMaster);
		
		PathologyTest savedPathologyTest=service.save(pathologyTest);
		return new ResponseEntity<>(savedPathologyTest,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<PathologyTest>> getAllPathologyTest(){
		List<PathologyTest> pathologyTests=service.getAllPathologyTest();
		return new ResponseEntity<>(pathologyTests,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PathologyTest> getPathologyTestById(@PathVariable("id") int id){
		PathologyTest pathologyTest=service.getPathologyTestById(id);
		return new ResponseEntity<>(pathologyTest,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<PathologyTest>> getPathologyTestByVisitId(@PathVariable("visitId") int visitId){
		List<PathologyTest> pathologyTests=service.getPathologyTestByVisitId(visitId);
		return new ResponseEntity<>(pathologyTests,HttpStatus.OK);
	}
	
	@GetMapping("/test-master/{testId}")
	public ResponseEntity<List<PathologyTest>> getPathologyTestByTestId(@PathVariable("testId") int testId){
		List<PathologyTest> pathologyTests=service.getPathologyTestByTestId(testId);
		return new ResponseEntity<>(pathologyTests,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PathologyTest> updatePathologyTestById(@PathVariable("id") int id,@RequestBody PathologyTestDto pathologyTestDto){
		PathologyTest pathologyTest=service.getPathologyTestById(id);
		Visits visit=visitService.getVisitsById(pathologyTestDto.getVisitId());
		TestMaster testMaster=testMasterService.getTestMasterById(pathologyTestDto.getTestId());
			
		pathologyTest.setResult(pathologyTestDto.getResult());
		pathologyTest.setRemarks(pathologyTestDto.getRemarks());
		pathologyTest.setReport_file(pathologyTestDto.getReport_file());
		pathologyTest.setVisit(visit);
		pathologyTest.setTest_masters(testMaster);
		
		PathologyTest updatedPathologyTest=service.save(pathologyTest);
		return new ResponseEntity<>(updatedPathologyTest,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePathologyTestById(@PathVariable("id") int id){
		service.deleteByPathologyTestId(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
