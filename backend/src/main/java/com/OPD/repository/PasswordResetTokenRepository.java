package com.OPD.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OPD.entities.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	Optional<PasswordResetToken> findByToken(String token);
	Optional<PasswordResetToken> findByEmail(String email);
	void deleteByEmail(String email);
}
