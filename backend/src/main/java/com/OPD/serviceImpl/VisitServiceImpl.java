package com.OPD.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Visit;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.VisitRepository;
import com.OPD.services.VisitService;

@Service
public class VisitServiceImpl implements VisitService {

	@Autowired
	private VisitRepository repository;
	
	@Override
	public Visit save(Visit visit) {
		return repository.save(visit);
	}

	@Override
	public List<Visit> getAllVisits() {
		return repository.findAll();
	}

	@Override
	public Visit getVisitById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Visit not found with id: "+id));
	}

	@Override
	public void deleteVisitById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Visit not found with id: "+id));
		repository.deleteById(id);
	}

	@Override
	public List<Visit> getVisitsByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public List<Visit> getVisitsByPatientId(Integer patientId) {
		return repository.findByPatient_Id(patientId);
	}

	@Override
	public List<Visit> getVisitsByDoctorIdAndVisitDate(Integer doctorId, LocalDate visitDate) {
		return repository.findByDoctor_IdAndVisitDate(doctorId, visitDate);
	}

	@Override
	public List<Visit> getDoctorFollowUps(Integer doctorId) {
		return repository.findByDoctor_IdAndFollowupDateIsNotNull(doctorId);
	}

	@Override
	public List<Visit> getTodayFollowUps(Integer doctorId) {
		return repository.findByDoctor_IdAndFollowupDate(doctorId, LocalDate.now());
	}

	@Override
	public List<Visit> getOverdueFollowUps(Integer doctorId) {
		return repository.findByDoctor_IdAndFollowupDateBefore(doctorId, LocalDate.now());
	}

}
