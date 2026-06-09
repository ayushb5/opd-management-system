package com.OPD.services;

import java.util.List;

import com.OPD.entities.Prescription;

public interface PrescriptionService {
	Prescription save(Prescription prescription);
	List<Prescription> getAllPrescriptions();
	Prescription getPrescriptionById(Integer id);
	List<Prescription> getPrescriptionsByVisitId(Integer visitId);
	List<Prescription> getPrescriptionsByMedicineId(Integer medicineId);
	void deletePrescriptionById(Integer id);
}
