package com.OPD.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.OPD.entities.ReferralCenter;

public interface ReferralCenterService {
	ReferralCenter save(ReferralCenter referralCenter);
	Page<ReferralCenter> getAllReferralCenters(int page,int size,String search);
	ReferralCenter getReferralCenterById(Integer id);
	List<ReferralCenter> getReferralCentersByDoctorId(Integer doctorId);
	void deleteReferralCenterById(Integer id);
}
