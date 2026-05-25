package com.OPD.services;

import java.util.List;

import com.OPD.entities.Receptionist;

public interface ReceptionistService {
	Receptionist saveReceptionist(Receptionist receptionist);
	List<Receptionist> getAllReceptionist();
	Receptionist getReceptionistById(int id);
	List<Receptionist> getReceptionistByDoctorId(int doctorId);
	void deleteReceptionistById(int id);
}
