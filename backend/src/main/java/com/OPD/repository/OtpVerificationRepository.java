package com.OPD.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OPD.entities.OtpVerification;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Integer> {
	Optional<OtpVerification> findByEmail(String email);
	void deleteByEmail(String email);
}
