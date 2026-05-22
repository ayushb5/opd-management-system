package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.VisitReport;
@Repository
public interface VisitReportRepository extends JpaRepository<VisitReport, Integer> {
	List<VisitReport> findByVisitId(int visitId);
}	
