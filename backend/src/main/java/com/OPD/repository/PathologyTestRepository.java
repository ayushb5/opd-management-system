package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.PathologyTest;
@Repository
public interface PathologyTestRepository extends JpaRepository<PathologyTest, Integer> {
	List<PathologyTest> findByVisitId(int visitId);
	List<PathologyTest> findByTestMasterId(int testId);
}
