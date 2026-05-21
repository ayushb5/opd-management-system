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

import com.OPD.dto.BillDto;
import com.OPD.entities.Bill;
import com.OPD.entities.Visits;
import com.OPD.services.BillService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bill")
@CrossOrigin
public class BillController {
	@Autowired
	private BillService service;
	@Autowired
	private VisitService visitService;
	
	@PostMapping
	public ResponseEntity<Bill> saveBill(@Valid @RequestBody BillDto billDto){
		Bill bill=new Bill();
		Visits visit=visitService.getVisitsById(billDto.getVisitId());

		bill.setConsultation_fee(billDto.getConsultation_fee());
		bill.setPayment_status(billDto.getPayment_status());
		bill.setPayment_mode(billDto.getPayment_mode());
		bill.setConcession(billDto.getConcession());
		bill.setPaid_amount(billDto.getPaid_amount());
		bill.setTotal_amount(billDto.getTotal_amount());
		bill.setPending_amount(billDto.getPending_amount());
		bill.setVisit(visit);
		bill.setCreated_at(LocalDateTime.now());
		
		Bill savedBill=service.save(bill);
		return new ResponseEntity<>(savedBill,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Bill>> getAllBills(){
		List<Bill> bills=service.getAllBills();
		return new ResponseEntity<>(bills,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Bill> getBillById(@PathVariable("id") int id){
		Bill bill=service.getBillById(id);
		return new ResponseEntity<>(bill,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<Bill>> getBillsByVisitId(@PathVariable("visitId") int visitId){
		List<Bill> bills=service.getBillsByVisitId(visitId);
		return new ResponseEntity<>(bills,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Bill> updateBillById(@PathVariable("id") int id,@Valid @RequestBody BillDto billDto){
		Bill bill=service.getBillById(id);
		Visits visit=visitService.getVisitsById(billDto.getVisitId());
		
		bill.setConsultation_fee(billDto.getConsultation_fee());
		bill.setPayment_status(billDto.getPayment_status());
		bill.setPayment_mode(billDto.getPayment_mode());
		bill.setConcession(billDto.getConcession());
		bill.setPaid_amount(billDto.getPaid_amount());
		bill.setTotal_amount(billDto.getTotal_amount());
		bill.setPending_amount(billDto.getPending_amount());
		bill.setVisit(visit);
		
		Bill updatedBill=service.save(bill);
		return new ResponseEntity<>(updatedBill,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBillById(@PathVariable("id") int id){
		service.deleteBillById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
