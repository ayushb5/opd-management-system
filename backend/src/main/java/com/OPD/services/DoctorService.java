package com.OPD.services;


import java.util.List;

import org.springframework.data.domain.Page;

import com.OPD.entities.Doctor;

public interface DoctorService {
	Doctor save(Doctor doctor);
	Page<Doctor> getDoctors(int page,int size,String search);
	List<Doctor> getAllDoctors();
	Doctor getDoctorById(Integer id);
	void deleteDoctorById(Integer id);
}
