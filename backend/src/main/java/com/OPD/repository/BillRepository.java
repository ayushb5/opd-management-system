package com.OPD.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Bill;
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
	Bill findByVisit_Id(Integer visitId);
}
