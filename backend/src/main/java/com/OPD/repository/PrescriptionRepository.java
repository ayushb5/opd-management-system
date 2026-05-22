package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Prescriptions;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescriptions, Integer> {
	List<Prescriptions> findByVisitId(int visitId);
	List<Prescriptions> findByMedicineId(int medicineId);
}
