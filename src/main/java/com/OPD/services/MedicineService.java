package com.OPD.services;

import java.util.List;

import com.OPD.entities.Medicine;

public interface MedicineService {
	Medicine save(Medicine medicine);
	List<Medicine> getAllMedicines();
	Medicine getMedicineById(int id);
	List<Medicine> getMedicinesByDoctorId(int doctorId);
	void deleteMedicineById(int id);
}
