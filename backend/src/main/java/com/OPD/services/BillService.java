package com.OPD.services;

import java.util.List;

import com.OPD.entities.Bill;

public interface BillService {
	Bill save(Bill bill);
	List<Bill> getAllBills();
	Bill getBillById(int id);
	List<Bill> getBillsByVisitId(int visitId);
	void deleteBillById(int id);
}
