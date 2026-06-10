package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Diagnostic;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.DiagnosticRepository;
import com.OPD.services.DiagnosticService;
@Service
public class DiagnosticServiceImpl implements DiagnosticService {
	@Autowired
	private DiagnosticRepository repository;
	
	@Override
	public Diagnostic save(Diagnostic diagnostic) {
		return repository.save(diagnostic);
	}

	@Override
	public List<Diagnostic> getAllDiagnostics() {
		return repository.findAll();
	}

	@Override
	public Diagnostic getDiagnosticById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Diagnostic not found with id: "+id));
	}

	@Override
	public List<Diagnostic> getDiagnosticsByVisitId(Integer visitId) {
		return repository.findByVisit_Id(visitId);
	}

	@Override
	public List<Diagnostic> getDiagnosticsByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public void deleteDiagnosticById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Diagnostic not found with id: "+id));
		repository.deleteById(id);
	}

}
