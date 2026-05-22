package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.TestMaster;
@Repository
public interface TestMasterRepository extends JpaRepository<TestMaster, Integer> {
	List<TestMaster> findByDoctorId(int doctorId);
}
