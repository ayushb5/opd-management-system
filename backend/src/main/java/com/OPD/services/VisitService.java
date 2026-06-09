package com.OPD.services;

import java.util.List;

import com.OPD.entities.Visit;

public interface VisitService {
	Visit save(Visit visit);
	List<Visit> getAllVisits();
	Visit getVisitById(Integer id);
	void deleteVisitById(Integer id);
	List<Visit> getVisitsByDoctorId(Integer doctorId);
    List<Visit> getVisitsByPatientId(Integer patientId);
}
