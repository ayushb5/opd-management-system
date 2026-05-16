package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.VisitReport;
import com.OPD.repository.VisitReportRepository;
import com.OPD.services.VisitReportService;
@Service
public class VisitReportServiceImpl implements VisitReportService {
	
	@Autowired
	private VisitReportRepository repository;
	
	@Override
	public VisitReport save(VisitReport visitReport) {
		return repository.save(visitReport);
	}

	@Override
	public List<VisitReport> getAllVisitReports() {
		return repository.findAll();
	}

	@Override
	public VisitReport getVisitReportById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<VisitReport> getVisitReportByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public void deleteVisitReportById(int id) {
		repository.deleteById(id);
	}

}
