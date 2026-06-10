package com.OPD.serviceImpl;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.OPD.dto.LoginDto;
import com.OPD.entities.Admin;
import com.OPD.entities.Doctor;
import com.OPD.entities.Receptionist;
import com.OPD.exception.InvalidCredentialsException;
import com.OPD.repository.AdminRepository;
import com.OPD.repository.DoctorRepository;
import com.OPD.repository.ReceptionistRepository;
import com.OPD.response.LoginResponse;
import com.OPD.services.AuthService;
import com.OPD.services.JwtService;
@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private ReceptionistRepository receptionistRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Override
	public LoginResponse login(LoginDto loginDto) {
		Optional<Admin> admin=adminRepository.findByEmail(loginDto.getEmail());
		
		if(admin.isPresent()) {
			Admin adminData=admin.get();
			if(!passwordEncoder.matches(loginDto.getPassword(), adminData.getPassword())) {
				throw new InvalidCredentialsException("Invalid email or password");
			}
			return new LoginResponse(jwtService.generateToken(adminData.getEmail()),adminData.getRole(),adminData.getEmail(),adminData.getName());
		}
		
		Optional<Doctor> doctor=doctorRepository.findByEmail(loginDto.getEmail());
		if(doctor.isPresent()) {
			Doctor doctorData=doctor.get();
			if(!passwordEncoder.matches(loginDto.getPassword(), doctorData.getPassword())) {
				throw new InvalidCredentialsException("Invalid email or password");
			}
			return new LoginResponse(jwtService.generateToken(doctorData.getEmail()),doctorData.getRole(),doctorData.getEmail(),doctorData.getName());
		}
		
		Optional<Receptionist> receptionist=receptionistRepository.findByEmail(loginDto.getEmail());
		if(receptionist.isPresent()) {
			Receptionist receptionistData=receptionist.get();
			if(!passwordEncoder.matches(loginDto.getPassword(), receptionistData.getPassword())) {
				throw new InvalidCredentialsException("Invalid email or password");
			}
			return new LoginResponse(jwtService.generateToken(receptionistData.getEmail()), receptionistData.getRole(), receptionistData.getEmail(), receptionistData.getName());
		}
		throw new InvalidCredentialsException("Invalid email or password");
	}
	
//	@Override
//	public LoginResponse adminLogin(LoginDto loginDto) {
//		Admin admin=adminRepository.findByEmail(loginDto.getEmail()).orElseThrow(()->new InvalidCredentialsException("Invalid email or password"));
//		if(!passwordEncoder.matches(loginDto.getPassword(), admin.getPassword())) {
//			throw new InvalidCredentialsException("Invalid email or password");
//		}
//		return new LoginResponse(jwtService.generateToken(admin.getEmail()),admin.getRole(),admin.getEmail());
//	}
//	@Override
//	public LoginResponse doctorLogin(LoginDto loginDto) {
//		Doctor doctor=doctorRepository.findByEmail(loginDto.getEmail()).orElseThrow(()->new InvalidCredentialsException("Invalid email or password"));
//		if(!passwordEncoder.matches(loginDto.getPassword(), doctor.getPassword())) {
//			throw new InvalidCredentialsException("Invalid email or password");
//		}
//		return new LoginResponse(jwtService.generateToken(doctor.getEmail()),doctor.getRole(),doctor.getEmail());
//	}
//
//	@Override
//	public LoginResponse receptionistLogin(LoginDto loginDto) {
//		Receptionist receptionist=receptionistRepository.findByEmail(loginDto.getEmail()).orElseThrow(()->new InvalidCredentialsException("Invalid email or password"));
//		if(!passwordEncoder.matches(loginDto.getPassword(), receptionist.getPassword())) {
//			throw new InvalidCredentialsException("Invalid email or password");
//		}
//		return new LoginResponse(jwtService.generateToken(receptionist.getEmail()),receptionist.getRole(),receptionist.getEmail());
//	}
	

}
