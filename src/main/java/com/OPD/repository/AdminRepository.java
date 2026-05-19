package com.OPD.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.OPD.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

}
