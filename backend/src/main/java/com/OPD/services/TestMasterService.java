package com.OPD.services;

import java.util.List;

import com.OPD.entities.TestMaster;

public interface TestMasterService {
	TestMaster save(TestMaster testMaster);
	List<TestMaster> getAllTestMasters();
	TestMaster getTestMasterById(Integer id);
	List<TestMaster> getTestMastersByDoctorId(Integer doctorId);
	void deleteTestMasterById(Integer id);
}
