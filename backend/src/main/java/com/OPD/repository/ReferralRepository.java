package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Referral;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, Integer> {
	List<Referral> findByVisit_Id(Integer visitId);
	List<Referral> findByPatient_Id(Integer patientId);
	List<Referral> findByDoctor_Id(Integer doctorId);
	List<Referral> findByReferralCenter_Id(Integer referralCenterId);
}
