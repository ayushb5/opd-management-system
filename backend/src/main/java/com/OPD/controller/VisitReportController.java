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

import com.OPD.dto.VisitReportDto;
import com.OPD.entities.VisitReport;
import com.OPD.entities.Visit;
import com.OPD.services.VisitReportService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/visit-reports")
@CrossOrigin
public class VisitReportController {
	@Autowired
	private VisitReportService service;
	@Autowired
	private VisitService visitService;
	
	@PostMapping
	public ResponseEntity<VisitReport> saveVisitReport(@Valid @RequestBody VisitReportDto visitReportDto){
		VisitReport visitReport=new VisitReport();
		Visit visit=visitService.getVisitById(visitReportDto.getVisitId());
		visitReport.setFileName(visitReportDto.getFileName());
		visitReport.setFileType(visitReportDto.getFileType());
		visitReport.setFileUrl(visitReportDto.getFileUrl());
		visitReport.setVisit(visit);
		
		VisitReport savedVisitReport=service.save(visitReport);
		return new ResponseEntity<>(savedVisitReport,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<VisitReport>> getAllVisitReports(){
		List<VisitReport> visitReports=service.getAllVisitReports();
		return new ResponseEntity<>(visitReports,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<VisitReport> getVisitReportById(@PathVariable("id") Integer id){
		VisitReport visitReport=service.getVisitReportById(id);
		return new ResponseEntity<>(visitReport,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<VisitReport>> getVisitReportByVisitId(@PathVariable("visitId") Integer visitId){
		List<VisitReport> visitReports=service.getVisitReportsByVisitId(visitId);
		return new ResponseEntity<>(visitReports,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<VisitReport> updateVisitReportById(@PathVariable("id") Integer id,@Valid @RequestBody VisitReportDto visitReportDto){
		VisitReport visitReport = service.getVisitReportById(id);
		Visit visit=visitService.getVisitById(visitReportDto.getVisitId());
		visitReport.setFileName(visitReportDto.getFileName());
		visitReport.setFileType(visitReportDto.getFileType());
		visitReport.setFileUrl(visitReportDto.getFileUrl());
		visitReport.setVisit(visit);
		
		VisitReport updatedVisitReport=service.save(visitReport);
		return new ResponseEntity<>(updatedVisitReport,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVisitReportById(@PathVariable("id") Integer id){
		service.deleteVisitReportById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
