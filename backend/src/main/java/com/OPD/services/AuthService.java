package com.OPD.services;

import com.OPD.dto.LoginDto;
import com.OPD.dto.VerifyOtpDto;
import com.OPD.response.LoginOtpResponse;
import com.OPD.response.LoginResponse;

public interface AuthService {
//	LoginResponse adminLogin(LoginDto loginDto);
//	LoginResponse doctorLogin(LoginDto loginDto);
//	LoginResponse receptionistLogin(LoginDto loginDto);
	LoginOtpResponse login(LoginDto loginDto);
	LoginResponse verifyOtp(VerifyOtpDto dto);
}
