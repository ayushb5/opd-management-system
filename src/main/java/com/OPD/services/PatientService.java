package com.OPD.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.OPD.entities.Patient;
import com.OPD.repository.PatientRepository;

public interface PatientService {
	Patient save(Patient patient);
	List<Patient> getAll();
	Patient getById(int id);
	List<Patient> getPatientByDoctorId(int doctorId);
	void deletePatientById(int id);
}
