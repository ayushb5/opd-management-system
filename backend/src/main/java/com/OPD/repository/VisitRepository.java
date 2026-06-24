package com.OPD.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Integer> {
	List<Visit> findByVisitDate(LocalDate visitDate);
	List<Visit> findByDoctor_Id(Integer doctorId);
	List<Visit> findByPatient_Id(Integer patientId);
	List<Visit> findByDoctor_IdAndVisitDate(
	        Integer doctorId,
	        LocalDate visitDate
	);
	
	List<Visit> findByDoctor_IdAndFollowupDateIsNotNull(Integer doctorId);

	List<Visit> findByDoctor_IdAndFollowupDate(
	        Integer doctorId,
	        LocalDate followupDate
	);
	
	List<Visit> findByDoctor_IdAndFollowupDateBefore(
	        Integer doctorId,
	        LocalDate followupDate
	);
}
