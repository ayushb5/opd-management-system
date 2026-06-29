package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public Page<Patient> getPatients(int page,int size,String search) {
		Pageable pageable = PageRequest.of(page,size);
		if (search == null || search.isBlank()) {
		    return repository.findAll(pageable);
		}

		return repository.findByPatientNameContainingIgnoreCaseOrMobileNoContaining(
		        search,
		        search,
		        pageable
		);
	}
	
	@Override
	public List<Patient> getAllPatients(){
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
