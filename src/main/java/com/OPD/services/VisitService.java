package com.OPD.services;

import java.util.List;

import com.OPD.entities.Visits;

public interface VisitService {
	Visits save(Visits visit);
	List<Visits> getAllVisits();
	Visits getVisitsById(int id);
	void deleteVisitsById(int id);
	List<Visits> getVisitsByDoctorId(int doctorId);
    List<Visits> getVisitsByPatientId(int patientId);
}
