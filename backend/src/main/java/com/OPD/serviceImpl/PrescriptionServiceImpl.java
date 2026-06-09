package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Prescription;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.PrescriptionRepository;
import com.OPD.services.PrescriptionService;
@Service
public class PrescriptionServiceImpl implements PrescriptionService {

	@Autowired
	private PrescriptionRepository repository;
	
	@Override
	public Prescription save(Prescription prescription) {
		return repository.save(prescription);
	}

	@Override
	public List<Prescription> getAllPrescriptions() {
		return repository.findAll();
	}

	@Override
	public Prescription getPrescriptionById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Prescription not found with id: "+id));
	}

	@Override
	public List<Prescription> getPrescriptionsByVisitId(Integer visitId) {
		return repository.findByVisit_Id(visitId);
	}

	@Override
	public List<Prescription> getPrescriptionsByMedicineId(Integer medicineId) {
		return repository.findByMedicine_Id(medicineId);
	}

	@Override
	public void deletePrescriptionById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Prescription not found with id: "+id));
		repository.deleteById(id);
	}

}
