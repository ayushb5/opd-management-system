package com.OPD.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	Optional<Doctor> findByEmail(String email);
	
	Page<Doctor> findByNameContainingIgnoreCaseOrSpecializationContainingIgnoreCaseOrMobileNoContaining(
	        String name,
	        String specialization,
	        String mobileNo,
	        Pageable pageable
	);
}	
