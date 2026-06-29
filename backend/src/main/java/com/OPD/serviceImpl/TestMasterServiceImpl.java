package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.OPD.entities.TestMaster;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.TestMasterRepository;
import com.OPD.services.TestMasterService;
@Service
public class TestMasterServiceImpl implements TestMasterService {
	@Autowired
	private TestMasterRepository repository;
	@Override
	public TestMaster save(TestMaster testMaster) {
		return repository.save(testMaster);
	}

	@Override
	public Page<TestMaster> getTestMasters(int page,int size,String search) {
		Pageable pageable=PageRequest.of(page, size);
		if (search == null || search.isBlank()) {
		    return repository.findAll(pageable);
		}
		return repository.findByTestNameContainingIgnoreCaseOrDoctor_NameContainingIgnoreCase(
				search,
				search, 
				pageable
		);
	}
	
	@Override
	public List<TestMaster> getAllTestMasters(){
		return repository.findAll();
	}
	
	@Override
	public TestMaster getTestMasterById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Test Master not found with id: "+id));
	}

	@Override
	public List<TestMaster> getTestMastersByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public void deleteTestMasterById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Test Master not found with id: "+id));
		repository.deleteById(id);
	}

}
