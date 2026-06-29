package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.OPD.entities.Doctor;
import com.OPD.enums.Role;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.DoctorRepository;
import com.OPD.services.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService {
	
	@Autowired
	private DoctorRepository repository;
	
	@Override
	public Doctor save(Doctor doctor) {
		doctor.setRole(Role.DOCTOR);
		if(doctor.getStatus() == null) {
			doctor.setStatus(Doctor.Status.TRIAL);
		}
		return repository.save(doctor);
	}

	@Override
	public Page<Doctor> getDoctors(int page,int size,String search) {
		Pageable pageable=PageRequest.of(page, size);
		if (search == null || search.isBlank()) {
		    return repository.findAll(pageable);
		}
		return repository.findByNameContainingIgnoreCaseOrSpecializationContainingIgnoreCaseOrMobileNoContaining(
				search, 
				search, 
				search, 
				pageable
		);
	}
	
	@Override
	public List<Doctor> getAllDoctors(){
		return repository.findAll();
	}

	@Override
	public Doctor getDoctorById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Doctor not found with id: "+id));
	}

	@Override
	public void deleteDoctorById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Doctor not found with id: "+id));
		repository.deleteById(id);
	}

}
