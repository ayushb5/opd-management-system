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

import com.OPD.dto.MedicineDto;
import com.OPD.entities.Doctor;
import com.OPD.entities.Medicine;
import com.OPD.services.DoctorService;
import com.OPD.services.MedicineService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/medicines")
@CrossOrigin
public class MedicineController {
	@Autowired
	private MedicineService service;
	
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<Medicine> saveMedicine(@Valid @RequestBody MedicineDto medicineDto){
		Medicine medicine=new Medicine();
		Doctor doctor=doctorService.getDoctorById(medicineDto.getDoctorId());
		
		medicine.setMedicineName(medicineDto.getMedicineName());
		medicine.setType(medicineDto.getType());
		medicine.setDoctor(doctor);
		
		Medicine savedMedicine=service.save(medicine);
		return new ResponseEntity<>(savedMedicine,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Medicine>> getAllMedicines(){
		List<Medicine> medicines=service.getAllMedicines();
		return new ResponseEntity<>(medicines,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Medicine> getMedicineById(@PathVariable("id") Integer id){
		Medicine medicine=service.getMedicineById(id);
		return new ResponseEntity<>(medicine,HttpStatus.OK);
	}
	
	@GetMapping("/doctor/{id}")
	public ResponseEntity<List<Medicine>> getMedicineByDoctorId(@PathVariable("id") Integer id){
		List<Medicine> medicines=service.getMedicinesByDoctorId(id);
		return new ResponseEntity<>(medicines,HttpStatus.OK);
	}
	
	@PutMapping("/{medicineId}")
	public ResponseEntity<Medicine> updateMedicineById(@PathVariable("medicineId") Integer medicineId,@Valid @RequestBody MedicineDto medicineDto){
		Medicine medicine=service.getMedicineById(medicineId);
		
		Doctor doctor=doctorService.getDoctorById(medicineDto.getDoctorId());
				
		medicine.setMedicineName(medicineDto.getMedicineName());
		medicine.setType(medicineDto.getType());
		medicine.setDoctor(doctor);
		
		Medicine updatedMedicine=service.save(medicine);
		return new ResponseEntity<>(updatedMedicine,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteMedicineById(@PathVariable("id") Integer id){
		service.deleteMedicineById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
