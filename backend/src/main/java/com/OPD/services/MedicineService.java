package com.OPD.services;

import java.util.List;

import com.OPD.entities.Medicine;

public interface MedicineService {
	Medicine save(Medicine medicine);
	List<Medicine> getAllMedicines();
	Medicine getMedicineById(Integer id);
	List<Medicine> getMedicinesByDoctorId(Integer doctorId);
	void deleteMedicineById(Integer id);
}
