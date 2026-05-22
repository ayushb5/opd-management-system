package com.OPD.services;

import java.util.List;

import com.OPD.entities.VisitReport;

public interface VisitReportService {
	VisitReport save(VisitReport visitReport);
	List<VisitReport> getAllVisitReports();
	VisitReport getVisitReportById(int id);
	List<VisitReport> getVisitReportByVisitId(int visitId);
	void deleteVisitReportById(int id);
}
