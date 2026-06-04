package com.OPD.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Admin;
import com.OPD.enums.Role;
import com.OPD.exception.ResourceNotFoundException;
import com.OPD.repository.AdminRepository;
import com.OPD.services.AdminService;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository repository;

	@Override
	public Admin save(Admin admin) {
		admin.setRole(Role.ADMIN);
		return repository.save(admin);
	}

	@Override
	public List<Admin> getAllAdmins() {
		return repository.findAll();
	}

	@Override
	public Admin getAdminById(int id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
	}

	@Override
	public void deleteAdminById(int id) {
		repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
		repository.deleteById(id);
	}

}
