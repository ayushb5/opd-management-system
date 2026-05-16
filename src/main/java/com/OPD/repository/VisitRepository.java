package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Visits;

@Repository
public interface VisitRepository extends JpaRepository<Visits, Integer> {
	List<Visits> findByDoctorId(int doctorId);
	List<Visits> findByPatientId(int patientId);
}
