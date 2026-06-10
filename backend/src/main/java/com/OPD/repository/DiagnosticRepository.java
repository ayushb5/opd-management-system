package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Diagnostic;

@Repository
public interface DiagnosticRepository extends JpaRepository<Diagnostic, Integer> {
	List<Diagnostic> findByVisit_Id(Integer visitId);
	List<Diagnostic> findByDoctor_Id(Integer doctorId);
}
