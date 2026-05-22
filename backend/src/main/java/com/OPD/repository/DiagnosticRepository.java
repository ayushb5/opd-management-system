package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Diagnostics;

@Repository
public interface DiagnosticRepository extends JpaRepository<Diagnostics, Integer> {
	List<Diagnostics> findByVisitId(int visitId);
	List<Diagnostics> findByDoctorId(int doctorId);
}
