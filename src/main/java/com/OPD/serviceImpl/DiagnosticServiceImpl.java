package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Diagnostics;
import com.OPD.repository.DiagnosticRepository;
import com.OPD.services.DiagnosticService;
@Service
public class DiagnosticServiceImpl implements DiagnosticService {
	@Autowired
	private DiagnosticRepository repository;
	
	@Override
	public Diagnostics save(Diagnostics diagnostic) {
		return repository.save(diagnostic);
	}

	@Override
	public List<Diagnostics> getAllDiagnostic() {
		return repository.findAll();
	}

	@Override
	public Diagnostics getDiagnosticById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<Diagnostics> getDiagnosticByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public List<Diagnostics> getDiagnosticByDoctorId(int doctorId) {
		return repository.findByDoctorId(doctorId);
	}

	@Override
	public void deleteDiagnosticById(int id) {
		repository.deleteById(id);
	}

}
