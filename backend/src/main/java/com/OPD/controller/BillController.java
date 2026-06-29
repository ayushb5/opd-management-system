package com.OPD.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.OPD.dto.BillDto;
import com.OPD.entities.Bill;
import com.OPD.entities.Visit;
import com.OPD.services.BillPdfService;
import com.OPD.services.BillService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bills")
@CrossOrigin
public class BillController {
	@Autowired
	private BillService service;
	@Autowired
	private VisitService visitService;
	@Autowired BillPdfService billPdfService;
	
	@PostMapping
	public ResponseEntity<Bill> saveBill(@Valid @RequestBody BillDto billDto){
		Bill bill=new Bill();
		Visit visit=visitService.getVisitById(billDto.getVisitId());

		bill.setConsultationFee(billDto.getConsultationFee());
		bill.setPaymentStatus(billDto.getPaymentStatus());
		bill.setPaymentMode(billDto.getPaymentMode());
		bill.setConcession(billDto.getConcession());
		bill.setPaidAmount(billDto.getPaidAmount());
		bill.setTotalAmount(billDto.getTotalAmount());
		
//		Pending amount
		BigDecimal pendingAmount =
		        billDto.getTotalAmount()
		               .subtract(billDto.getConcession())
		               .subtract(billDto.getPaidAmount());

		bill.setPendingAmount(pendingAmount);
		
		bill.setVisit(visit);
		
		Bill savedBill=service.save(bill);
		return new ResponseEntity<>(savedBill,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<Page<Bill>> getAllBills(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "") String search){
		Page<Bill> bills=service.getAllBills(page,size,search);
		return new ResponseEntity<>(bills,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Bill> getBillById(@PathVariable("id") Integer id){
		Bill bill=service.getBillById(id);
		return new ResponseEntity<>(bill,HttpStatus.OK);
	}
	
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<Bill> getBillByVisitId(@PathVariable("visitId") Integer visitId){
		Bill bill=service.getBillByVisitId(visitId);
		return new ResponseEntity<>(bill,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Bill> updateBillById(@PathVariable("id") Integer id,@Valid @RequestBody BillDto billDto){
		Bill bill=service.getBillById(id);
		Visit visit=visitService.getVisitById(billDto.getVisitId());
		
		bill.setConsultationFee(billDto.getConsultationFee());
		bill.setPaymentStatus(billDto.getPaymentStatus());
		bill.setPaymentMode(billDto.getPaymentMode());
		bill.setConcession(billDto.getConcession());
		bill.setPaidAmount(billDto.getPaidAmount());
		bill.setTotalAmount(billDto.getTotalAmount());
		
//		Pending amount
		BigDecimal pendingAmount =
		        billDto.getTotalAmount()
		               .subtract(billDto.getConcession())
		               .subtract(billDto.getPaidAmount());

		bill.setPendingAmount(pendingAmount);
		bill.setVisit(visit);
		
		Bill updatedBill=service.save(bill);
		return new ResponseEntity<>(updatedBill,HttpStatus.OK);
	}
	
//	Download Bill Pdf
	@GetMapping("/{id}/pdf")
	public ResponseEntity<byte[]> downloadBillPdf(@PathVariable Integer id) {

	byte[] pdfBytes = billPdfService.generateBillPdf(id);

	HttpHeaders headers = new HttpHeaders();

	headers.setContentType(MediaType.APPLICATION_PDF);

	headers.setContentDisposition(
	        ContentDisposition.inline()
	                .filename("bill-" + id + ".pdf")
	                .build()
	);

	return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBillById(@PathVariable("id") Integer id){
		service.deleteBillById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
