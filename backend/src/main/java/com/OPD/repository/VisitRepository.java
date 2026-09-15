package com.OPD.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.OPD.dto.DailyCountDto;
import com.OPD.dto.MonthlyVisitDto;
import com.OPD.entities.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Integer> {
	List<Visit> findByVisitDate(LocalDate visitDate);

	List<Visit> findByDoctor_Id(Integer doctorId);

	List<Visit> findByPatient_Id(Integer patientId);

	List<Visit> findByDoctor_IdAndVisitDate(Integer doctorId, LocalDate visitDate);

	List<Visit> findByDoctor_IdAndFollowupDateIsNotNull(Integer doctorId);

	List<Visit> findByDoctor_IdAndFollowupDate(Integer doctorId, LocalDate followupDate);

	List<Visit> findByDoctor_IdAndFollowupDateBefore(Integer doctorId, LocalDate followupDate);

	long countByVisitDate(LocalDate visitDate);

	long countByDoctor_IdAndVisitDate(Integer doctorId, LocalDate visitDate);

	long countByDoctor_IdAndVisitDateAndStatus(Integer doctorId, LocalDate visitDate, Visit.Status status);

	long countByStatusIn(List<Visit.Status> statuses);

	List<Visit> findTop5ByOrderByVisitDateDescIdDesc();

//	For Doctor Dashboard

	long countByDoctor_IdAndFollowupDate(Integer doctorId, LocalDate followupDate);

	long countByDoctor_IdAndStatusIn(Integer doctorId, List<Visit.Status> statuses);

	List<Visit> findTop5ByDoctor_IdOrderByVisitDateDescIdDesc(Integer doctorId);

//	Get Visits by search functionality
	Page<Visit> findByPatient_PatientNameContainingIgnoreCaseOrDoctor_NameContainingIgnoreCaseOrComplaintsContainingIgnoreCaseOrDiagnosisContainingIgnoreCase(
			String patientName, String doctorName, String complaints, String diagnosis, Pageable pageable);

//	Weekly visits last 7 days -> Hospital-wide
	@Query("SELECT new com.OPD.dto.DailyCountDto(v.visitDate,COUNT(v)) " + "FROM Visit v "
			+ "WHERE v.visitDate >= :startDate " + "GROUP BY v.visitDate " + "ORDER BY v.visitDate ASC")
	List<DailyCountDto> findDailyVisitCounts(@Param("startDate") LocalDate startDate);

//	Weekly visits last 7 days -> Doctor-wide
	@Query("SELECT new com.OPD.dto.DailyCountDto(v.visitDate,COUNT(v)) " + "FROM Visit v "
			+ "WHERE v.doctor.id = :doctorId AND v.visitDate >= :startDate " + "GROUP BY v.visitDate "
			+ "ORDER BY v.visitDate ASC")
	List<DailyCountDto> findDailyVisitCountsByDoctor(@Param("doctorId") Integer doctorId,
			@Param("startDate") LocalDate startDate);

//	Monthly Consultations -> Hospital-wide
	@Query("SELECT new com.OPD.dto.MonthlyVisitDto(FUNCTION('DATE_FORMAT',v.visitDate,'%b')," + "COUNT(v)) "
			+ "FROM Visit v " + "GROUP BY FUNCTION('DATE_FORMAT',v.visitDate,'%b')")
	List<MonthlyVisitDto> findMonthlyVisitCounts();
	
	long countByDoctor_IdAndVisitDateAndStatusIn(Integer doctorId, LocalDate visitDate, List<Visit.Status> statuses);

}
