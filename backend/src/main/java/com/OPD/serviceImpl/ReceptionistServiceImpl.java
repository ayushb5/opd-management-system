package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Receptionist save(Receptionist receptionist) {
		receptionist.setRole(Role.RECEPTIONIST);
		if(receptionist.getStatus() == null) {
			receptionist.setStatus(Receptionist.Status.ACTIVE);
		}
		return repository.save(receptionist);
	}

	@Override
	public List<Receptionist> getAllReceptionists() {
		return repository.findAll();
	}

	@Override
	public Receptionist getReceptionistById(Integer id) {
		return repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Receptionist not found with id: "+id));
	}

	@Override
	public List<Receptionist> getReceptionistsByDoctorId(Integer doctorId) {
		return repository.findByDoctor_Id(doctorId);
	}

	@Override
	public void deleteReceptionistById(Integer id) {
		repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Receptionist not found with id:"+id));
		repository.deleteById(id);
	}

}
