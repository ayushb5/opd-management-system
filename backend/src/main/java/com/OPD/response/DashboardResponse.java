package com.OPD.response;

import java.util.List;

public class DashboardResponse {
	private long todayVisits;
	private long totalDoctors;
	private long totalPatients;
	private long pendingVisits;
	private long todayFollowups;
	private long todayNewPatients;
	
	private List<RecentVisitResponse> recentVisits;
	
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
	
}
