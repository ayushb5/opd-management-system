package com.OPD.response;

import java.util.List;

public class DashboardResponse {
	private long todayVisits;
	private long totalDoctors;
	private long totalPatients;
	private long pendingVisits;
	private List<RecentVisitResponse> recentVisits;
	
	public DashboardResponse() {
		
	}

	public DashboardResponse(long todayVisits, long totalDoctors, long totalPatients, long pendingVisits,
			List<RecentVisitResponse> recentVisits) {
		super();
		this.todayVisits = todayVisits;
		this.totalDoctors = totalDoctors;
		this.totalPatients = totalPatients;
		this.pendingVisits = pendingVisits;
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

	public List<RecentVisitResponse> getRecentVisits() {
		return recentVisits;
	}

	public void setRecentVisits(List<RecentVisitResponse> recentVisits) {
		this.recentVisits = recentVisits;
	}
	
}
