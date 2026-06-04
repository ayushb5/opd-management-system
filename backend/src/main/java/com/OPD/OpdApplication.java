package com.OPD;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.OPD.entities.Doctor;

@SpringBootApplication
public class OpdApplication {
	public static void main(String[] args) {
		SpringApplication.run(OpdApplication.class, args);
		System.out.println("Project is running...");
	}
}
