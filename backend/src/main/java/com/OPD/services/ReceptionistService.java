package com.OPD.services;

import java.util.List;

import com.OPD.entities.Receptionist;

public interface ReceptionistService {
	Receptionist save(Receptionist receptionist);
	List<Receptionist> getAllReceptionists();
	Receptionist getReceptionistById(Integer id);
	List<Receptionist> getReceptionistsByDoctorId(Integer doctorId);
	void deleteReceptionistById(Integer id);
}
