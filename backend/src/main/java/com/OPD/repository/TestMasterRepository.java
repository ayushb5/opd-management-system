package com.OPD.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.TestMaster;
@Repository
public interface TestMasterRepository extends JpaRepository<TestMaster, Integer> {
	List<TestMaster> findByDoctor_Id(Integer doctorId);
	
	Page<TestMaster> findByTestNameContainingIgnoreCaseOrDoctor_NameContainingIgnoreCase(
	        String testName,
	        String doctorName,
	        Pageable pageable
	);
}
