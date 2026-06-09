package com.OPD.services;

import java.util.List;

import com.OPD.entities.Admin;

public interface AdminService {
	Admin save(Admin admin);
	List<Admin> getAllAdmins();
	Admin getAdminById(Integer id);
	void deleteAdminById(Integer id);
}
