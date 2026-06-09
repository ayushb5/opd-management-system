package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
	List<Prescription> findByVisit_Id(Integer visitId);
	List<Prescription> findByMedicine_Id(Integer medicineId);
}
