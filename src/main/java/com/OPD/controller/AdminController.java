package com.OPD.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.OPD.entities.Admin;
import com.OPD.services.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	@Autowired
	private AdminService service;
	@PostMapping
	public ResponseEntity<Admin> save(@Valid @RequestBody AdminDto adminDto){
		Admin admin=new Admin();
		admin.setName(adminDto.getName());
		admin.setEmail(adminDto.getEmail());
		admin.setMobileno(adminDto.getMobileno());
		admin.setPassword(adminDto.getPassword());
		admin.setCreated_at(LocalDateTime.now());
		admin.setUpdated_at(LocalDateTime.now());
		
		Admin savedAdmin=service.save(admin);
		return new ResponseEntity<>(savedAdmin,HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Admin>> getAllAdmins(){
		List<Admin> admins=service.getAllAdmins();
		return new ResponseEntity<>(admins,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Admin> getAdminById(@PathVariable("id") int id){
		Admin admin=service.getAdminById(id);
		return new ResponseEntity<>(admin,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Admin> updateAdminById(@PathVariable("id") int id,@Valid @RequestBody AdminDto adminDto){
		Admin admin=service.getAdminById(id);
		
		admin.setName(adminDto.getName());
		admin.setEmail(adminDto.getEmail());
		admin.setMobileno(adminDto.getMobileno());
		admin.setPassword(adminDto.getPassword());
		admin.setUpdated_at(LocalDateTime.now());
		
		Admin updatedAdmin=service.save(admin);
		return new ResponseEntity<>(updatedAdmin,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAdminById(@PathVariable("id") int id){
		service.deleteAdminById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
