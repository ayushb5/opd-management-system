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

import com.OPD.dto.PrescriptionDto;
import com.OPD.entities.Medicine;
import com.OPD.entities.Prescription;
import com.OPD.entities.Visit;
import com.OPD.services.MedicineService;
import com.OPD.services.PrescriptionService;
import com.OPD.services.VisitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/prescriptions")
@CrossOrigin
public class PrescriptionController {
	@Autowired
	private PrescriptionService service;
	
	@Autowired
	private VisitService visitService;
	
	@Autowired
	private MedicineService medicineService;
	
	@PostMapping
	public ResponseEntity<Prescription> savePrescription(@Valid @RequestBody PrescriptionDto prescriptionDto){
		Prescription prescription=new Prescription();
		
		Visit visit=visitService.getVisitById(prescriptionDto.getVisitId());
		Medicine medicine=medicineService.getMedicineById(prescriptionDto.getMedicineId());
		
		prescription.setDosage(prescriptionDto.getDosage());
		prescription.setDuration(prescriptionDto.getDuration());
		prescription.setInstructions(prescriptionDto.getInstructions());
		prescription.setQuantity(prescriptionDto.getQuantity());
		prescription.setMorningDose(prescriptionDto.getMorningDose());
		prescription.setAfternoonDose(prescriptionDto.getAfternoonDose());
		prescription.setEveningDose(prescriptionDto.getEveningDose());
		prescription.setDurationDays(prescriptionDto.getDurationDays());
		prescription.setTotalQuantity(prescriptionDto.getTotalQuantity());
		prescription.setQuantityNote(prescriptionDto.getQuantityNote());
		prescription.setDoseQuantity(prescriptionDto.getDoseQuantity());
		prescription.setDoseUnit(prescriptionDto.getDoseUnit());
		prescription.setVisit(visit);
		prescription.setMedicine(medicine);
		
		Prescription savedPrescription=service.save(prescription);
		return new ResponseEntity<>(savedPrescription,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Prescription>> getAllPrescriptions(){
		List<Prescription> prescriptions=service.getAllPrescriptions();
		return new ResponseEntity<>(prescriptions,HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Prescription> getPrescriptionById(@PathVariable("id") Integer id){
		Prescription prescription=service.getPrescriptionById(id);
		return new ResponseEntity<>(prescription,HttpStatus.OK);
	}
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<Prescription>> getPrescriptionByVisitId(@PathVariable("visitId") Integer visitId){
		List<Prescription> prescriptions=service.getPrescriptionsByVisitId(visitId);
		return new ResponseEntity<>(prescriptions,HttpStatus.OK);
	}
	@GetMapping("/medicine/{medicineId}")
	public ResponseEntity<List<Prescription>> getPrescriptionByMedicineId(@PathVariable("medicineId") Integer medicineId){
		List<Prescription> prescriptions=service.getPrescriptionsByMedicineId(medicineId);
		return new ResponseEntity<>(prescriptions,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	public ResponseEntity<Prescription> updatePrescriptionById(@PathVariable("id") Integer id,@Valid @RequestBody PrescriptionDto prescriptionDto){
		Prescription prescription=service.getPrescriptionById(id);
		Visit visit=visitService.getVisitById(prescriptionDto.getVisitId());
		Medicine medicine=medicineService.getMedicineById(prescriptionDto.getMedicineId());
		
		prescription.setDosage(prescriptionDto.getDosage());
		prescription.setDuration(prescriptionDto.getDuration());
		prescription.setInstructions(prescriptionDto.getInstructions());
		prescription.setQuantity(prescriptionDto.getQuantity());
		prescription.setMorningDose(prescriptionDto.getMorningDose());
		prescription.setAfternoonDose(prescriptionDto.getAfternoonDose());
		prescription.setEveningDose(prescriptionDto.getEveningDose());
		prescription.setDurationDays(prescriptionDto.getDurationDays());
		prescription.setTotalQuantity(prescriptionDto.getTotalQuantity());
		prescription.setQuantityNote(prescriptionDto.getQuantityNote());
		prescription.setDoseQuantity(prescriptionDto.getDoseQuantity());
		prescription.setDoseUnit(prescriptionDto.getDoseUnit());
		prescription.setVisit(visit);
		prescription.setMedicine(medicine);
		
		Prescription updatedPrescription=service.save(prescription);
		return new ResponseEntity<>(updatedPrescription,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePrescriptionById(@PathVariable("id") Integer id){
		service.deletePrescriptionById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
