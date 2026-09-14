package com.OPD;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.OPD.entities.Bill;
import com.OPD.exception.BadRequestException;
import com.OPD.repository.BillRepository;
import com.OPD.serviceImpl.BillServiceImpl;

@ExtendWith(MockitoExtension.class)
public class BillServiceTest {
	@Mock
	private BillRepository billRepository;

	@InjectMocks
	private BillServiceImpl billService;

	@Test
	public void testPaidAmountExceedsTotalThrowsException() {
		Bill bill = new Bill();
		bill.setTotalAmount(new BigDecimal("1000"));
		bill.setPaidAmount(new BigDecimal("1500"));
		bill.setConcession(BigDecimal.ZERO);

		assertThrows(BadRequestException.class, () -> {
			billService.save(bill);
		});
	}

	@Test
	public void testPaidPlusConcessionExceedsTotalThrowsException() {
		Bill bill = new Bill();
		bill.setTotalAmount(new BigDecimal("1000"));
		bill.setPaidAmount(new BigDecimal("800"));
		bill.setConcession(new BigDecimal("300")); // 800 + 300 = 1100 > 1000

		assertThrows(BadRequestException.class, () -> {
			billService.save(bill);
		});
	}
}
