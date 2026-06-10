package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.ReferralCenter;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.ReferralCenterRepository;
import com.OPD.services.ReferralCenterService;
@Service
public class ReferralCenterServiceImpl implements ReferralCenterService {
	@Autowired
	private ReferralCenterRepository repository;
	@Override
	public ReferralCenter save(ReferralCenter referralCenter) {
		return repository.save(referralCenter);
	}

	@Override
	public List<ReferralCenter> getAllReferralCenters() {
		return repository.findAll();
	}

	@Override
	public ReferralCenter getReferralCenterById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Referral Center not found with id: "+id));
	}

	@Override
	public List<ReferralCenter> getReferralCentersByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public void deleteReferralCenterById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Referral Center not found with id: "+id));
		repository.deleteById(id);
	}

}
