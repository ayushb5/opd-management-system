package com.OPD.services;

import java.util.List;
import org.springframework.data.domain.Page;
import com.OPD.entities.Receptionist;

public interface ReceptionistService {
	Receptionist save(Receptionist receptionist);
	Page<Receptionist> getAllReceptionists(int page,int size,String search);
	Receptionist getReceptionistById(Integer id);
	List<Receptionist> getReceptionistsByDoctorId(Integer doctorId);
	void deleteReceptionistById(Integer id);
}
