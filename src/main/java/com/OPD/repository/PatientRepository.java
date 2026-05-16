package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Patient;
@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	List<Patient> findbyDoctorId(int id);
}
