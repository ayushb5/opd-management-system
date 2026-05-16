package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Prescriptions;
import com.OPD.repository.PrescriptionRepository;
import com.OPD.services.PrescriptionService;
@Service
public class PrescriptionServiceImpl implements PrescriptionService {

	@Autowired
	private PrescriptionRepository repository;
	
	@Override
	public Prescriptions save(Prescriptions prescription) {
		return repository.save(prescription);
	}

	@Override
	public List<Prescriptions> getAllPrescriptions() {
		return repository.findAll();
	}

	@Override
	public Prescriptions getPrescriptionById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<Prescriptions> getPrescriptionByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public List<Prescriptions> getPrescriptionByMedicineId(int medicineId) {
		return repository.findByMedicineId(medicineId);
	}

	@Override
	public void deletePrescriptionById(int id) {
		repository.deleteById(id);
	}

}
