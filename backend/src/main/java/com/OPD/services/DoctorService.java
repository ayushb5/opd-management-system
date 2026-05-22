package com.OPD.services;

import java.util.List;

import com.OPD.entities.Doctor;

public interface DoctorService {
	Doctor save(Doctor doctor);
	List<Doctor> getAllDoctors();
	Doctor getDoctorById(int id);
	void deleteDoctorById(int id);
}
