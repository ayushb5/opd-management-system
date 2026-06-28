package com.OPD.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.OPD.entities.Patient;
@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	List<Patient> findByDoctor_Id(Integer doctorId);
	long countByDoctor_Id(Integer doctorId);
	long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
	
	Page<Patient> findByPatientNameContainingIgnoreCaseOrMobileNoContaining(
	        String patientName,
	        String mobileNo,
	        Pageable pageable
	);
}
