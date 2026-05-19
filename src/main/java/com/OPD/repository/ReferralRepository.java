package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Referral;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, Integer> {
	List<Referral> findByVisitId(int visitId);
	List<Referral> findByPatientId(int patientId);
	List<Referral> findByDoctorId(int doctorId);
	List<Referral> findByReferralCenterId(int referralCenterId);
}
