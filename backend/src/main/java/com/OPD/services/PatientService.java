package com.OPD.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.OPD.entities.Patient;

public interface PatientService {
	Patient save(Patient patient);
	Page<Patient> getPatients(int page, int size, String search);
	List<Patient> getAllPatients();
	Patient getById(Integer id);
	List<Patient> getPatientByDoctorId(Integer doctorId);
	void deletePatientById(Integer id);
}
