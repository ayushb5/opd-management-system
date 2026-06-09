package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Patient;
import com.OPD.exception.ResourceNotFoundException;
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
	public Patient getById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Patient not found with id: "+id));
	}

	@Override
	public List<Patient> getPatientByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public void deletePatientById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Patient not found with id: "+id));
		repository.deleteById(id);

	}

}
