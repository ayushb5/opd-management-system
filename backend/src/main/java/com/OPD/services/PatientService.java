package com.OPD.services;

import java.util.List;
import com.OPD.entities.Patient;

public interface PatientService {
	Patient save(Patient patient);
	List<Patient> getAll();
	Patient getById(Integer id);
	List<Patient> getPatientByDoctorId(Integer doctorId);
	void deletePatientById(Integer id);
}
