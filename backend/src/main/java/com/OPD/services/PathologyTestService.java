package com.OPD.services;

import java.util.List;

import com.OPD.entities.PathologyTest;

public interface PathologyTestService {
	PathologyTest save(PathologyTest pathologyTest);
	List<PathologyTest> getAllPathologyTests();
	PathologyTest getPathologyTestById(Integer id);
	List<PathologyTest> getPathologyTestsByVisitId(Integer visitId);
	List<PathologyTest> getPathologyTestsByTestMasterId(Integer testMasterId);
	void deletePathologyTestById(Integer id);
}
