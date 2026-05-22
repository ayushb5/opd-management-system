package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Bill;
import com.OPD.exception.BadRequestException;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.BillRepository;
import com.OPD.services.BillService;

@Service
public class BillServiceImpl implements BillService {
	@Autowired
	private BillRepository repository;
	@Override
	public Bill save(Bill bill) {
		if(bill.getPaid_amount().compareTo(bill.getTotal_amount())>0) {
			throw new BadRequestException("Paid amount cannot exceed total amount");
		}
		
		if (bill.getConcession().compareTo(bill.getTotal_amount()) > 0) {
	        throw new BadRequestException("Concession cannot exceed total amount");
	    }
		return repository.save(bill);
	}

	@Override
	public List<Bill> getAllBills() {
		return repository.findAll();
	}

	@Override
	public Bill getBillById(int id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Bill not found with id: "+id));
	}

	@Override
	public List<Bill> getBillsByVisitId(int visitId) {
		return repository.findByVisitId(visitId);
	}

	@Override
	public void deleteBillById(int id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Bill not found with id: "+id));
		repository.deleteById(id);
	}

}
