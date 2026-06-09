package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Integer> {
	List<Visit> findByDoctor_Id(Integer doctorId);
	List<Visit> findByPatient_Id(Integer patientId);
}
