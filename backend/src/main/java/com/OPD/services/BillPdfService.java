package com.OPD.services;

public interface BillPdfService {
	byte[] generateBillPdf(Integer billId);
}
