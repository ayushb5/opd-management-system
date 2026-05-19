package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Bill;
import com.OPD.repository.BillRepository;
import com.OPD.services.BillService;

@Service
public class BillServiceImpl implements BillService {
	@Autowired
	private BillRepository repository;
	@Override
	public Bill save(Bill bill) {
		return repository.save(bill);
	}

	@Override
	public List<Bill> getAllBills() {
		return repository.findAll();
	}

	@Override
	public Bill getBillById(int id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public List<Bill> getBillsByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public void deleteBillById(int id) {
		repository.deleteById(id);
	}

}
