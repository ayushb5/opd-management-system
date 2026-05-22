package com.OPD.services;

import java.util.List;

import com.OPD.entities.Referral;

public interface ReferralService {
	Referral save(Referral referral);
	List<Referral> getAllReferrals();
	Referral getReferralById(int id);
	List<Referral> getReferralsByVisitId(int visitId);
	List<Referral> getReferralsByPatientId(int patientId);
	List<Referral> getReferralsByDoctorId(int doctorId);
	List<Referral> getReferralsByReferralCenterId(int referralCenterId);
	void deleteReferralById(int id);
}
