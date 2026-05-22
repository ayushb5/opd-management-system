package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.ReferralCenter;
@Repository
public interface ReferralCenterRepository extends JpaRepository<ReferralCenter, Integer> {
	List<ReferralCenter> findByDoctorId(int doctorId);
}
