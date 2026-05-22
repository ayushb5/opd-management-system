package com.OPD.services;

import java.util.List;

import com.OPD.entities.ReferralCenter;

public interface ReferralCenterService {
	ReferralCenter save(ReferralCenter referralCenter);
	List<ReferralCenter> getAllReferralCenters();
	ReferralCenter getReferralCenterById(int id);
	List<ReferralCenter> getReferralCentersByDoctorId(int doctorId);
	void deleteReferralCenterById(int id);
}
