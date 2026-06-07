package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Doctor;
import com.OPD.entities.Receptionist;
import com.OPD.enums.Role;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.ReceptionistRepository;
import com.OPD.services.ReceptionistService;
@Service
public class ReceptionistServiceImpl implements ReceptionistService {
	@Autowired
	private ReceptionistRepository repository;
	@Override
	public Receptionist saveReceptionist(Receptionist receptionist) {
		receptionist.setRole(Role.RECEPTIONIST);
		if(receptionist.getStatus() == null) {
			receptionist.setStatus(Receptionist.Status.ACTIVE);
		}
		return repository.save(receptionist);
	}

	@Override
	public List<Receptionist> getAllReceptionist() {
		return repository.findAll();
	}

	@Override
	public Receptionist getReceptionistById(int id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Receptionist not found with id:"+id));
	}

	@Override
	public List<Receptionist> getReceptionistByDoctorId(int doctorId) {
		return repository.findByDoctorId(doctorId);
	}

	@Override
	public void deleteReceptionistById(int id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Receptionist not found with id:"+id));
		repository.deleteById(id);
	}

}
