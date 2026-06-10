package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.PathologyTest;
@Repository
public interface PathologyTestRepository extends JpaRepository<PathologyTest, Integer> {
	List<PathologyTest> findByVisit_Id(Integer visitId);
	List<PathologyTest> findByTestMaster_Id(Integer testMasterId);
}
