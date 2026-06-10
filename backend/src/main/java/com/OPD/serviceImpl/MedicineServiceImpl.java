package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Medicine;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.MedicineRepository;
import com.OPD.services.MedicineService;

@Service
public class MedicineServiceImpl implements MedicineService {

	@Autowired
	private MedicineRepository repository;
	
	@Override
	public Medicine save(Medicine medicine) {
		return repository.save(medicine);
	}

	@Override
	public List<Medicine> getAllMedicines() {
		return repository.findAll();
	}

	@Override
	public Medicine getMedicineById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Medicine not found with id: "+id));
	}

	@Override
	public List<Medicine> getMedicinesByDoctorId(Integer id) {
		return repository.findByDoctor_Id(id);
	}

	@Override
	public void deleteMedicineById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Medicine not found with id: "+id));
		repository.deleteById(id);
	}
}
