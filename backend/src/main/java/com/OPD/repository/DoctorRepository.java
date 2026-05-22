package com.OPD.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	
}	
