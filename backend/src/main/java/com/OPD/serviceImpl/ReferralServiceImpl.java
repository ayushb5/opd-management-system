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
	public Referral getReferralById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Referral not found with id: "+id));
	}

	@Override
	public List<Referral> getReferralsByVisitId(Integer visitId) {
		return repository.findByVisit_Id(visitId);
	}

	@Override
	public List<Referral> getReferralsByPatientId(Integer patientId) {
		return repository.findByPatient_Id(patientId);
	}

	@Override
	public List<Referral> getReferralsByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public List<Referral> getReferralsByReferralCenterId(Integer referralCenterId) {
		return repository.findByReferralCenter_Id(referralCenterId);
	}

	@Override
	public void deleteReferralById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Referral not found with id: "+id));
		repository.deleteById(id);
	}

}
