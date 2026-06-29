package com.OPD.services;

import org.springframework.data.domain.Page;

import com.OPD.entities.Bill;

public interface BillService {
	Bill save(Bill bill);
	Page<Bill> getAllBills(int page,int size,String search);
	Bill getBillById(Integer id);
	Bill getBillByVisitId(Integer visitId);
	void deleteBillById(Integer id);
}
