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
		if(bill.getPaidAmount().compareTo(bill.getTotalAmount())>0) {
			throw new BadRequestException("Paid amount cannot exceed total amount");
		}
		
		if (bill.getConcession().compareTo(bill.getTotalAmount()) > 0) {
	        throw new BadRequestException("Concession cannot exceed total amount");
	    }
		
		if (bill.getConcession().add(bill.getPaidAmount()).compareTo(bill.getTotalAmount()) > 0) {
		     throw new BadRequestException(
		                "Concession + Paid Amount cannot exceed Total Amount");
		}
		
		Bill existingBill = repository.findByVisit_Id(bill.getVisit().getId());

		if (existingBill != null &&
		    (bill.getId() == null || !existingBill.getId().equals(bill.getId()))) {
		    throw new BadRequestException(
		            "Bill already exists for visit id: " + bill.getVisit().getId());
		}
		return repository.save(bill);
	}

	@Override
	public List<Bill> getAllBills() {
		return repository.findAll();
	}

	@Override
	public Bill getBillById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Bill not found with id: "+id));
	}

	@Override
	public Bill getBillByVisitId(Integer visitId) {
		 Bill bill = repository.findByVisit_Id(visitId);

		 if (bill == null) {
		        throw new ResourceNotFoundException(
		                "Bill not found for visit id: " + visitId);
		    }

		 return bill;
	}

	@Override
	public void deleteBillById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Bill not found with id: "+id));
		repository.deleteById(id);
	}

}
