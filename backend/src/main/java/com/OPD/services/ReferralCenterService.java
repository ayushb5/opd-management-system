package com.OPD.services;

import java.util.List;

import com.OPD.entities.ReferralCenter;

public interface ReferralCenterService {
	ReferralCenter save(ReferralCenter referralCenter);
	List<ReferralCenter> getAllReferralCenters();
	ReferralCenter getReferralCenterById(Integer id);
	List<ReferralCenter> getReferralCentersByDoctorId(Integer doctorId);
	void deleteReferralCenterById(Integer id);
}
