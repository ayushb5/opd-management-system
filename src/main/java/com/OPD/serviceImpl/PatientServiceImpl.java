package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Patient;
import com.OPD.repository.PatientRepository;
import com.OPD.services.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository repository;
	@Override
	public Patient save(Patient patient) {
		return repository.save(patient);
	}

	@Override
	public List<Patient> getAll() {
		return repository.findAll();
	}

	@Override
	public Patient getById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<Patient> getPatientByDoctorId(int id) {
		return repository.findbyDoctorId(id);
	}

	@Override
	public void deletePatientById(int id) {
		repository.deleteById(id);

	}

}
