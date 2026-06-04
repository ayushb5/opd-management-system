package com.OPD.services;

import com.OPD.dto.LoginDto;
import com.OPD.response.LoginResponse;

public interface AuthService {
//	LoginResponse adminLogin(LoginDto loginDto);
//	LoginResponse doctorLogin(LoginDto loginDto);
//	LoginResponse receptionistLogin(LoginDto loginDto);
	LoginResponse login(LoginDto loginDto);
}
