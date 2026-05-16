package com.OPD.services;

import java.util.List;

import com.OPD.entities.PathologyTest;

public interface PathologyTestService {
	PathologyTest save(PathologyTest pathologyTest);
	List<PathologyTest> getAllPathologyTest();
	PathologyTest getPathologyTestById(int id);
	List<PathologyTest> getPathologyTestByVisitId(int visitId);
	List<PathologyTest> getPathologyTestByTestId(int testId);
	void deleteByPathologyTestId(int id);
}
