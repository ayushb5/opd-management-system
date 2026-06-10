package com.OPD.services;

import java.util.List;

import com.OPD.entities.Bill;

public interface BillService {
	Bill save(Bill bill);
	List<Bill> getAllBills();
	Bill getBillById(Integer id);
	Bill getBillByVisitId(Integer visitId);
	void deleteBillById(Integer id);
}
