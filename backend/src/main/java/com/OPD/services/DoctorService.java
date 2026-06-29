package com.OPD.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.OPD.entities.Doctor;

public interface DoctorService {
	Doctor save(Doctor doctor);
	Page<Doctor> getAllDoctors(int page,int size,String search);
	Doctor getDoctorById(Integer id);
	void deleteDoctorById(Integer id);
}
