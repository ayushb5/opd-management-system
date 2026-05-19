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

import com.OPD.dto.VisitReportDto;
import com.OPD.entities.VisitReport;
import com.OPD.entities.Visits;
import com.OPD.services.VisitReportService;
import com.OPD.services.VisitService;

@RestController
@RequestMapping("/visit-report")
@CrossOrigin
public class VisitReportController {
	@Autowired
	private VisitReportService service;
	@Autowired
	private VisitService visitService;
	
	@PostMapping
	public ResponseEntity<VisitReport> saveVisitReport(@RequestBody VisitReportDto visitReportDto){
		VisitReport visitReport=new VisitReport();
		Visits visit=visitService.getVisitsById(visitReportDto.getVisitId());
		visitReport.setFile_name(visitReportDto.getFile_name());
		visitReport.setFile_type(visitReportDto.getFile_type());
		visitReport.setFile_url(visitReportDto.getFile_url());
		visitReport.setCreated_at(LocalDateTime.now());
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
	public ResponseEntity<VisitReport> getVisitReportById(@PathVariable("id") int id){
		VisitReport visitReport=service.getVisitReportById(id);
		if(visitReport==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(visitReport,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<VisitReport>> getVisitReportByVisitId(@PathVariable("visitId") int visitId){
		List<VisitReport> visitReports=service.getVisitReportByVisitId(visitId);
		return new ResponseEntity<>(visitReports,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<VisitReport> updateVisitReportById(@PathVariable("id") int id,@RequestBody VisitReportDto visitReportDto){
		VisitReport visitReport = service.getVisitReportById(id);
		Visits visit=visitService.getVisitsById(visitReportDto.getVisitId());
		visitReport.setFile_name(visitReportDto.getFile_name());
		visitReport.setFile_type(visitReportDto.getFile_type());
		visitReport.setFile_url(visitReportDto.getFile_url());
		visitReport.setVisit(visit);
		
		VisitReport updatedVisitReport=service.save(visitReport);
		return new ResponseEntity<>(updatedVisitReport,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVisitReportById(@PathVariable("id") int id){
		service.deleteVisitReportById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
