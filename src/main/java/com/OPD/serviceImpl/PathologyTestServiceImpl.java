package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.PathologyTest;
import com.OPD.repository.PathologyTestRepository;
import com.OPD.services.PathologyTestService;
@Service
public class PathologyTestServiceImpl implements PathologyTestService {

	@Autowired
	private PathologyTestRepository repository;
	
	@Override
	public PathologyTest save(PathologyTest pathologyTest) {
		return repository.save(pathologyTest);
	}

	@Override
	public List<PathologyTest> getAllPathologyTest() {
		return repository.findAll();
	}

	@Override
	public PathologyTest getPathologyTestById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<PathologyTest> getPathologyTestByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public List<PathologyTest> getPathologyTestByTestId(int testId) {
		return repository.findByTestMasterId(testId);
	}

	@Override
	public void deleteByPathologyTestId(int id) {
		repository.deleteById(id);

	}

}
