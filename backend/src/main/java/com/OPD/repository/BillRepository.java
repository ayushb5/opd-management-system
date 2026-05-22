package com.OPD.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Bill;
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
	List<Bill> findByVisitId(int visitId);
}
