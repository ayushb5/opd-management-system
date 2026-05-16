package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Visits;
import com.OPD.repository.VisitRepository;
import com.OPD.services.VisitService;

@Service
public class VisitServiceImpl implements VisitService {

	@Autowired
	private VisitRepository repository;
	
	@Override
	public Visits save(Visits visit) {
		return repository.save(visit);
	}

	@Override
	public List<Visits> getAllVisits() {
		return repository.findAll();
	}

	@Override
	public Visits getVisitsById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public void deleteVisitsById(int id) {
		repository.deleteById(id);
	}

	@Override
	public List<Visits> getVisitsByDoctorId(int doctorId) {
		return repository.findByDoctorId(doctorId);
	}

	@Override
	public List<Visits> getVisitsByPatientId(int patientId) {
		return repository.findByPatientId(patientId);
	}

}
