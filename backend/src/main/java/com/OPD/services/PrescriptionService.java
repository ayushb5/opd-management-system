package com.OPD.services;

import java.util.List;

import com.OPD.entities.Prescriptions;

public interface PrescriptionService {
	Prescriptions save(Prescriptions prescription);
	List<Prescriptions> getAllPrescriptions();
	Prescriptions getPrescriptionById(int id);
	List<Prescriptions> getPrescriptionByVisitId(int visitId);
	List<Prescriptions> getPrescriptionByMedicineId(int medicineId);
	void deletePrescriptionById(int id);
}
