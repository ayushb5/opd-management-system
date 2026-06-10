package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.PathologyTest;
import com.OPD.exception.ResourceNotFoundException;
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
	public List<PathologyTest> getAllPathologyTests() {
		return repository.findAll();
	}

	@Override
	public PathologyTest getPathologyTestById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Pathology Test not found with id: "+id));
	}

	@Override
	public List<PathologyTest> getPathologyTestsByVisitId(Integer visitId) {
		return repository.findByVisit_Id(visitId);
	}

	@Override
	public List<PathologyTest> getPathologyTestsByTestMasterId(Integer testMasterId) {
		return repository.findByTestMaster_Id(testMasterId);
	}

	@Override
	public void deletePathologyTestById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Pathology Test not found with id: "+id));
		repository.deleteById(id);
	}

}
