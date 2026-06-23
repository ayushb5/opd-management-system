package com.OPD.services;

import java.time.LocalDate;
import java.util.List;

import com.OPD.entities.Visit;

public interface VisitService {
	Visit save(Visit visit);
	List<Visit> getAllVisits();
	Visit getVisitById(Integer id);
	void deleteVisitById(Integer id);
	List<Visit> getVisitsByDoctorId(Integer doctorId);
    List<Visit> getVisitsByPatientId(Integer patientId);
    List<Visit> getVisitsByDoctorIdAndVisitDate(
            Integer doctorId,
            LocalDate visitDate
    );
    
    List<Visit> getDoctorFollowUps(Integer doctorId);

    List<Visit> getTodayFollowUps(Integer doctorId);

    List<Visit> getOverdueFollowUps(Integer doctorId);
}
