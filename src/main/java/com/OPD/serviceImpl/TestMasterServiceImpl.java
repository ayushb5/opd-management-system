package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.TestMaster;
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
	public List<TestMaster> getAllTestMaster() {
		return repository.findAll();
	}

	@Override
	public TestMaster getTestMasterById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<TestMaster> getTestMasterByDoctorId(int doctorId) {
		return repository.findByDoctorId(doctorId);
	}

	@Override
	public void deleteTestMasterById(int id) {
		repository.deleteById(id);
	}

}
