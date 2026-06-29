package com.OPD.repository;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Bill;
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
	Bill findByVisit_Id(Integer visitId);
	
	@Query("SELECT COALESCE(SUM(b.paidAmount), 0) FROM Bill b")
	BigDecimal sumPaidAmount();
	long countByPaymentStatus(String paymentStatus);
	
	Page<Bill> findByVisit_Patient_PatientNameContainingIgnoreCase(
	        String patientName,
	        Pageable pageable
	);
}
