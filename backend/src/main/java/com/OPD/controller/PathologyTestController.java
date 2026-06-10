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

import com.OPD.dto.PathologyTestDto;
import com.OPD.entities.PathologyTest;
import com.OPD.entities.TestMaster;
import com.OPD.entities.Visit;
import com.OPD.services.PathologyTestService;
import com.OPD.services.TestMasterService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/pathology-tests")
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
		Visit visit=visitService.getVisitById(pathologyTestDto.getVisitId());
		TestMaster testMaster=testMasterService.getTestMasterById(pathologyTestDto.getTestMasterId());
				
		pathologyTest.setResult(pathologyTestDto.getResult());
		pathologyTest.setRemarks(pathologyTestDto.getRemarks());
		pathologyTest.setReportFile(pathologyTestDto.getReportFile());
		pathologyTest.setVisit(visit);
		pathologyTest.setTestMaster(testMaster);
		
		PathologyTest savedPathologyTest=service.save(pathologyTest);
		return new ResponseEntity<>(savedPathologyTest,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<PathologyTest>> getAllPathologyTests(){
		List<PathologyTest> pathologyTests=service.getAllPathologyTests();
		return new ResponseEntity<>(pathologyTests,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PathologyTest> getPathologyTestById(@PathVariable("id") Integer id){
		PathologyTest pathologyTest=service.getPathologyTestById(id);
		return new ResponseEntity<>(pathologyTest,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<PathologyTest>> getPathologyTestsByVisitId(@PathVariable("visitId") Integer visitId){
		List<PathologyTest> pathologyTests=service.getPathologyTestsByVisitId(visitId);
		return new ResponseEntity<>(pathologyTests,HttpStatus.OK);
	}
	
	@GetMapping("/test-master/{testMasterId}")
	public ResponseEntity<List<PathologyTest>> getPathologyTestsByTestMasterId(@PathVariable("testMasterId") Integer testMasterId){
		List<PathologyTest> pathologyTests=service.getPathologyTestsByTestMasterId(testMasterId);
		return new ResponseEntity<>(pathologyTests,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PathologyTest> updatePathologyTestById(@PathVariable("id") Integer id,@Valid @RequestBody PathologyTestDto pathologyTestDto){
		PathologyTest pathologyTest=service.getPathologyTestById(id);
		Visit visit=visitService.getVisitById(pathologyTestDto.getVisitId());
		TestMaster testMaster=testMasterService.getTestMasterById(pathologyTestDto.getTestMasterId());
			
		pathologyTest.setResult(pathologyTestDto.getResult());
		pathologyTest.setRemarks(pathologyTestDto.getRemarks());
		pathologyTest.setReportFile(pathologyTestDto.getReportFile());
		pathologyTest.setVisit(visit);
		pathologyTest.setTestMaster(testMaster);
		
		PathologyTest updatedPathologyTest=service.save(pathologyTest);
		return new ResponseEntity<>(updatedPathologyTest,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePathologyTestById(@PathVariable("id") Integer id){
		service.deletePathologyTestById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
