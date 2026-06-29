package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public Page<ReferralCenter> getAllReferralCenters(int page,int size,String search) {
		Pageable pageable=PageRequest.of(page, size);
		if (search == null || search.isBlank()) {
		    return repository.findAll(pageable);
		}
		return repository.findByNameContainingIgnoreCaseOrDoctor_NameContainingIgnoreCase(
				search,
				search, 
				pageable
		);
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
