package com.OPD.services;

import java.util.List;

import com.OPD.entities.Referral;

public interface ReferralService {
	Referral save(Referral referral);
	List<Referral> getAllReferrals();
	Referral getReferralById(Integer id);
	List<Referral> getReferralsByVisitId(Integer visitId);
	List<Referral> getReferralsByPatientId(Integer patientId);
	List<Referral> getReferralsByDoctorId(Integer doctorId);
	List<Referral> getReferralsByReferralCenterId(Integer referralCenterId);
	void deleteReferralById(Integer id);
}
