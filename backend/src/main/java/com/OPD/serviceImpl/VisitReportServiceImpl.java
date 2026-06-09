package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.VisitReport;
import com.OPD.exception.ResourceNotFoundException;
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
	public VisitReport getVisitReportById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Visit Report not found with id: "+id));
	}

	@Override
	public List<VisitReport> getVisitReportsByVisitId(Integer visitId) {
		return repository.findByVisit_Id(visitId);
	}

	@Override
	public void deleteVisitReportById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Visit Report not found with id: "+id));
		repository.deleteById(id);
	}

}
