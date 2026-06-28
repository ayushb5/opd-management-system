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
	
	long countByVisitDate(LocalDate visitDate);
	
	long countByDoctor_IdAndVisitDate(Integer doctorId, LocalDate visitDate);
	
	long countByDoctor_IdAndVisitDateAndStatus(Integer doctorId, LocalDate visitDate, Visit.Status status);

	long countByStatusIn(List<Visit.Status> statuses);
	
	List<Visit> findTop5ByOrderByVisitDateDescIdDesc();
	
//	For Doctor Dashboard
	
	long countByDoctor_IdAndFollowupDate(Integer doctorId,LocalDate followupDate);
	
	long countByDoctor_IdAndStatusIn(Integer doctorId,List<Visit.Status> statuses);
	
	List<Visit> findTop5ByDoctor_IdOrderByVisitDateDescIdDesc(Integer doctorId);
}
