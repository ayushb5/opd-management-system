package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Referral;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.ReferralRepository;
import com.OPD.services.ReferralService;
@Service
public class ReferralServiceImpl implements ReferralService {
	@Autowired
	private ReferralRepository repository;
	@Override
	public Referral save(Referral referral) {
		return repository.save(referral);
	}

	@Override
	public List<Referral> getAllReferrals() {
		return repository.findAll();
	}

	@Override
	public Referral getReferralById(int id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Referral not found with id: "+id));
	}

	@Override
	public List<Referral> getReferralsByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public List<Referral> getReferralsByPatientId(int patientId) {
		return repository.findByPatientId(patientId);
	}

	@Override
	public List<Referral> getReferralsByDoctorId(int doctorId) {
		return repository.findByDoctorId(doctorId);
	}

	@Override
	public List<Referral> getReferralsByReferralCenterId(int referralCenterId) {
		return repository.findByReferralCenterId(referralCenterId);
	}

	@Override
	public void deleteReferralById(int id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Referral not found with id: "+id));
		repository.deleteById(id);
	}

}
