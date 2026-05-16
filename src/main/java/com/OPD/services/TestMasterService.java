package com.OPD.services;

import java.util.List;

import com.OPD.entities.TestMaster;

public interface TestMasterService {
	TestMaster save(TestMaster testMaster);
	List<TestMaster> getAllTestMaster();
	TestMaster getTestMasterById(int id);
	List<TestMaster> getTestMasterByDoctorId(int doctorId);
	void deleteTestMasterById(int id);
}
