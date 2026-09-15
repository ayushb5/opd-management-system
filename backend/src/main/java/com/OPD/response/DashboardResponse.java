package com.OPD.response;

import java.util.List;

import com.OPD.dto.DailyCountDto;
import com.OPD.dto.MonthlyVisitDto;
import com.OPD.dto.PaymentBreakdownDto;

public class DashboardResponse {
	private long todayVisits;
	private long totalDoctors;
	private long totalPatients;
	private long pendingVisits;
	private long todayFollowups;
	private long todayNewPatients;

	private List<RecentVisitResponse> recentVisits;
	private List<DailyCountDto> weeklyVisits;
	private List<MonthlyVisitDto> monthlyVisits;
	private List<PaymentBreakdownDto> paymentBreakdown;

	public DashboardResponse() {

	}

	public DashboardResponse(long todayVisits, long totalDoctors, long totalPatients, long pendingVisits,
			long todayFollowups, long todayNewPatients, List<RecentVisitResponse> recentVisits) {
		super();
		this.todayVisits = todayVisits;
		this.totalDoctors = totalDoctors;
		this.totalPatients = totalPatients;
		this.pendingVisits = pendingVisits;
		this.todayFollowups = todayFollowups;
		this.todayNewPatients = todayNewPatients;
		this.recentVisits = recentVisits;
	}

	public long getTodayVisits() {
		return todayVisits;
	}

	public void setTodayVisits(long todayVisits) {
		this.todayVisits = todayVisits;
	}

	public long getTotalDoctors() {
		return totalDoctors;
	}

	public void setTotalDoctors(long totalDoctors) {
		this.totalDoctors = totalDoctors;
	}

	public long getTotalPatients() {
		return totalPatients;
	}

	public void setTotalPatients(long totalPatients) {
		this.totalPatients = totalPatients;
	}

	public long getPendingVisits() {
		return pendingVisits;
	}

	public void setPendingVisits(long pendingVisits) {
		this.pendingVisits = pendingVisits;
	}

	public long getTodayFollowups() {
		return todayFollowups;
	}

	public void setTodayFollowups(long todayFollowups) {
		this.todayFollowups = todayFollowups;
	}

	public long getTodayNewPatients() {
		return todayNewPatients;
	}

	public void setTodayNewPatients(long todayNewPatients) {
		this.todayNewPatients = todayNewPatients;
	}

	public List<RecentVisitResponse> getRecentVisits() {
		return recentVisits;
	}

	public void setRecentVisits(List<RecentVisitResponse> recentVisits) {
		this.recentVisits = recentVisits;
	}

	public List<DailyCountDto> getWeeklyVisits() {
		return weeklyVisits;
	}

	public void setWeeklyVisits(List<DailyCountDto> weeklyVisits) {
		this.weeklyVisits = weeklyVisits;
	}

	public List<MonthlyVisitDto> getMonthlyVisits() {
		return monthlyVisits;
	}

	public void setMonthlyVisits(List<MonthlyVisitDto> monthlyVisits) {
		this.monthlyVisits = monthlyVisits;
	}

	public List<PaymentBreakdownDto> getPaymentBreakdown() {
		return paymentBreakdown;
	}

	public void setPaymentBreakdown(List<PaymentBreakdownDto> paymentBreakdown) {
		this.paymentBreakdown = paymentBreakdown;
	}

}
