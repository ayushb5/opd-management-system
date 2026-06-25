package com.OPD.services;

public interface PrescriptionPdfService {
	byte[] generatePrescriptionPdf(Integer visitId);
}
