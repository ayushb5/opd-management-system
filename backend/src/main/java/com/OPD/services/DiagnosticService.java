package com.OPD.services;

import java.util.List;

import com.OPD.entities.Diagnostics;

public interface DiagnosticService {
	Diagnostics save(Diagnostics diagnostic);
	List<Diagnostics> getAllDiagnostic();
	Diagnostics getDiagnosticById(int id);
	List<Diagnostics> getDiagnosticByVisitId(int visitId);
	List<Diagnostics> getDiagnosticByDoctorId(int doctorId);
	void deleteDiagnosticById(int id);
}
