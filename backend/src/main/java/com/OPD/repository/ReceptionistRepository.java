package com.OPD.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Receptionist;
@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Integer> {
	List<Receptionist> findByDoctor_Id(Integer doctorId);
	Optional<Receptionist> findByEmail(String email);
}
