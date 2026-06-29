package com.OPD.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.OPD.entities.TestMaster;

public interface TestMasterService {
	TestMaster save(TestMaster testMaster);
	Page<TestMaster> getTestMasters(int page,int size,String search);
	List<TestMaster> getAllTestMasters();
	TestMaster getTestMasterById(Integer id);
	List<TestMaster> getTestMastersByDoctorId(Integer doctorId);
	void deleteTestMasterById(Integer id);
}
