package com.OPD.services;

import java.util.List;

import com.OPD.entities.VisitReport;

public interface VisitReportService {
	VisitReport save(VisitReport visitReport);
	List<VisitReport> getAllVisitReports();
	VisitReport getVisitReportById(Integer id);
	List<VisitReport> getVisitReportsByVisitId(Integer visitId);
	void deleteVisitReportById(Integer id);
}
