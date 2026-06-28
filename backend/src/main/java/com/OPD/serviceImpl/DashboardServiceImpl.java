package com.OPD.serviceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPD.entities.Visit;
import com.OPD.repository.DoctorRepository;
import com.OPD.repository.PatientRepository;
import com.OPD.repository.VisitRepository;
import com.OPD.response.DashboardResponse;
import com.OPD.response.RecentVisitResponse;
import com.OPD.services.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

	@Autowired
	private VisitRepository visitRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	public DashboardResponse getAdminDashboard() {
		DashboardResponse response=new DashboardResponse();
		
		response.setTodayVisits(visitRepository.countByVisitDate(LocalDate.now()));
		
		response.setTotalDoctors(doctorRepository.count());
		
		response.setTotalPatients(patientRepository.count());
		
		long pendingVisits= visitRepository.countByStatusIn(List.of(Visit.Status.WAITING,Visit.Status.IN_CONSULTATION));
		response.setPendingVisits(pendingVisits);
		
		List<Visit> visits=visitRepository.findTop5ByOrderByVisitDateDescIdDesc();
		response.setRecentVisits(mapRecentVisits(visits));

		return response;
	}

	@Override
	public DashboardResponse getDoctorDashboard(Integer doctorId) {
		DashboardResponse response=new DashboardResponse();
		response.setTodayVisits(visitRepository.countByDoctor_IdAndVisitDate(doctorId, LocalDate.now()));
		response.setTotalPatients(patientRepository.countByDoctor_Id(doctorId));
		
		long pendingVisits=visitRepository.countByDoctor_IdAndStatusIn(doctorId, List.of(Visit.Status.WAITING,Visit.Status.IN_CONSULTATION));
		response.setPendingVisits(pendingVisits);
		response.setTodayFollowups(visitRepository.countByDoctor_IdAndFollowupDate(doctorId, LocalDate.now()));
		
		List<Visit> visits=visitRepository.findTop5ByDoctor_IdOrderByVisitDateDescIdDesc(doctorId);
		response.setRecentVisits(mapRecentVisits(visits));

		return response;
	}
	
	@Override
	public DashboardResponse getReceptionistDashboard() {
		DashboardResponse response=new DashboardResponse();
		response.setTodayVisits(visitRepository.countByVisitDate(LocalDate.now()));
		response.setTotalPatients(patientRepository.count());
		
		long pendingVisits= visitRepository.countByStatusIn(List.of(Visit.Status.WAITING,Visit.Status.IN_CONSULTATION));
		response.setPendingVisits(pendingVisits);
		
		LocalDate today = LocalDate.now();
		LocalDateTime start = today.atStartOfDay();
		LocalDateTime end = today.atTime(23, 59, 59);
		response.setTodayNewPatients(patientRepository.countByCreatedAtBetween(start, end));
		
		List<Visit> visits=visitRepository.findTop5ByOrderByVisitDateDescIdDesc();
		response.setRecentVisits(mapRecentVisits(visits));

		return response;
	}
	
	private List<RecentVisitResponse> mapRecentVisits(List<Visit> visits){
		List<RecentVisitResponse> recentVisits = new ArrayList<>();

		for (Visit visit : visits) {
		    RecentVisitResponse recentVisit = new RecentVisitResponse();
		    recentVisit.setVisitId(visit.getId());
		    recentVisit.setPatientName(visit.getPatient().getPatientName());
		    recentVisit.setDoctorName(visit.getDoctor().getName());
		    recentVisit.setVisitDate(visit.getVisitDate());
		    recentVisit.setStatus(visit.getStatus());

		    recentVisits.add(recentVisit);
		}
		
		return recentVisits;
	}

}
