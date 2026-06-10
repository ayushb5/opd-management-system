package com.OPD.services;

import java.util.List;

import com.OPD.entities.Diagnostic;

public interface DiagnosticService {
	Diagnostic save(Diagnostic diagnostic);
	List<Diagnostic> getAllDiagnostics();
	Diagnostic getDiagnosticById(Integer id);
	List<Diagnostic> getDiagnosticsByVisitId(Integer visitId);
	List<Diagnostic> getDiagnosticsByDoctorId(Integer doctorId);
	void deleteDiagnosticById(Integer id);
}
