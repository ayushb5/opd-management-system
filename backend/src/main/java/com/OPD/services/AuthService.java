package com.OPD.services;

import com.OPD.dto.LoginDto;

public interface AuthService {
	String adminLogin(LoginDto loginDto);
	String doctorLogin(LoginDto loginDto);
	String receptionistLogin(LoginDto loginDto);
}
