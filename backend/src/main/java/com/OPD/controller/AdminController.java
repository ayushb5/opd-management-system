package com.OPD.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OPD.dto.AdminDto;
import com.OPD.dto.AdminUpdateDto;
import com.OPD.entities.Admin;
import com.OPD.response.DashboardResponse;
import com.OPD.services.AdminService;
import com.OPD.services.DashboardService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService service;
	@Autowired
	private DashboardService dashboardService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@PostMapping
	public ResponseEntity<Admin> save(@Valid @RequestBody AdminDto adminDto){
		Admin admin=new Admin();
		admin.setName(adminDto.getName());
		admin.setEmail(adminDto.getEmail());
		admin.setMobileNo(adminDto.getMobileNo());
		admin.setPassword(passwordEncoder.encode(adminDto.getPassword()));
		
		Admin savedAdmin=service.save(admin);
		return new ResponseEntity<>(savedAdmin,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Admin>> getAllAdmins(){
		List<Admin> admins=service.getAllAdmins();
		return new ResponseEntity<>(admins,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Admin> getAdminById(@PathVariable("id") Integer id){
		Admin admin=service.getAdminById(id);
		return new ResponseEntity<>(admin,HttpStatus.OK);
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<DashboardResponse> getDashboard() {
	    return ResponseEntity.ok(dashboardService.getAdminDashboard());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Admin> updateAdminById(@PathVariable("id") Integer id,@Valid @RequestBody AdminUpdateDto adminUpdateDto){
		Admin admin=service.getAdminById(id);
		
		admin.setName(adminUpdateDto.getName());
		admin.setEmail(adminUpdateDto.getEmail());
		admin.setMobileNo(adminUpdateDto.getMobileNo());
		
		Admin updatedAdmin=service.save(admin);
		return new ResponseEntity<>(updatedAdmin,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAdminById(@PathVariable("id") Integer id){
		service.deleteAdminById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
