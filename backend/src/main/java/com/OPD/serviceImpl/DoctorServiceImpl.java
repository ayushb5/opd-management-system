package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
	public List<Doctor> getAllDoctors() {
		return repository.findAll();
	}

	@Override
	public Doctor getDoctorById(int id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Doctor not found with id: "+id));
	}

	@Override
	public void deleteDoctorById(int id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Doctor not found with id: "+id));
		repository.deleteById(id);
	}

}
