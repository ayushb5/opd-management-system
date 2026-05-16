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
import com.OPD.entities.Prescriptions;
import com.OPD.entities.Visits;
import com.OPD.services.MedicineService;
import com.OPD.services.PrescriptionService;
import com.OPD.services.VisitService;

@RestController
@RequestMapping("/prescription")
@CrossOrigin
public class PrescriptionController {
	@Autowired
	private PrescriptionService service;
	
	@Autowired
	private VisitService visitService;
	
	@Autowired
	private MedicineService medicineService;
	
	@PostMapping
	public ResponseEntity<Prescriptions> savePrescription(@RequestBody PrescriptionDto prescriptionDto){
		Prescriptions prescription=new Prescriptions();
		
		Visits visit=visitService.getVisitsById(prescriptionDto.getVisitId());
		Medicine medicine=medicineService.getMedicineById(prescriptionDto.getMedicineId());
		if(visit==null || medicine==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		prescription.setDosage(prescriptionDto.getDosage());
		prescription.setDuration(prescriptionDto.getDuration());
		prescription.setInstructions(prescriptionDto.getInstructions());
		prescription.setQuantity(prescriptionDto.getQuantity());
		prescription.setMorning_dose(prescriptionDto.getMorning_dose());
		prescription.setAfternoon_dose(prescriptionDto.getAfternoon_dose());
		prescription.setEvening_dose(prescriptionDto.getEvening_dose());
		prescription.setDuration_days(prescriptionDto.getDuration_days());
		prescription.setTotal_quantity(prescriptionDto.getTotal_quantity());
		prescription.setQuantity_note(prescriptionDto.getQuantity_note());
		prescription.setDose_qty(prescriptionDto.getDose_qty());
		prescription.setDose_unit(prescriptionDto.getDose_unit());
		prescription.setVisit(visit);
		prescription.setMedicine(medicine);
		
		Prescriptions savedPrescription=service.save(prescription);
		return new ResponseEntity<>(savedPrescription,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Prescriptions>> getAllPrescriptions(){
		List<Prescriptions> prescriptions=service.getAllPrescriptions();
		return new ResponseEntity<>(prescriptions,HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Prescriptions> getPrescriptionById(@PathVariable("id") int id){
		Prescriptions prescription=service.getPrescriptionById(id);
		if(prescription==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(prescription,HttpStatus.OK);
	}
	@GetMapping("/visit/{visitId}")
	public ResponseEntity<List<Prescriptions>> getPrescriptionByVisitId(@PathVariable("visitId") int visitId){
		List<Prescriptions> prescriptions=service.getPrescriptionByVisitId(visitId);
		return new ResponseEntity<>(prescriptions,HttpStatus.OK);
	}
	@GetMapping("/medicine/{medicineId}")
	public ResponseEntity<List<Prescriptions>> getPrescriptionByMedicineId(@PathVariable("medicineId") int medicineId){
		List<Prescriptions> prescriptions=service.getPrescriptionByMedicineId(medicineId);
		return new ResponseEntity<>(prescriptions,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	public ResponseEntity<Prescriptions> updatePrescriptionById(@PathVariable("id") int id,@RequestBody PrescriptionDto prescriptionDto){
		Prescriptions prescription=service.getPrescriptionById(id);
		Visits visit=visitService.getVisitsById(prescriptionDto.getVisitId());
		Medicine medicine=medicineService.getMedicineById(prescriptionDto.getMedicineId());
		
		if(prescription==null || visit==null || medicine==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		prescription.setDosage(prescriptionDto.getDosage());
		prescription.setDuration(prescriptionDto.getDuration());
		prescription.setInstructions(prescriptionDto.getInstructions());
		prescription.setQuantity(prescriptionDto.getQuantity());
		prescription.setMorning_dose(prescriptionDto.getMorning_dose());
		prescription.setAfternoon_dose(prescriptionDto.getAfternoon_dose());
		prescription.setEvening_dose(prescriptionDto.getEvening_dose());
		prescription.setDuration_days(prescriptionDto.getDuration_days());
		prescription.setTotal_quantity(prescriptionDto.getTotal_quantity());
		prescription.setQuantity_note(prescriptionDto.getQuantity_note());
		prescription.setDose_qty(prescriptionDto.getDose_qty());
		prescription.setDose_unit(prescriptionDto.getDose_unit());
		
		prescription.setVisit(visit);
		prescription.setMedicine(medicine);
		
		Prescriptions updatedPrescription=service.save(prescription);
		return new ResponseEntity<>(updatedPrescription,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePrescriptionById(@PathVariable("id") int id){
		Prescriptions prescription=service.getPrescriptionById(id);
		if(prescription==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		service.deletePrescriptionById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
