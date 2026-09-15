import { useEffect, useState } from "react"
import DashboardCard from "../../components/DashboardCard"
import { CalendarCheck, People, HourglassSplit, ClockHistory } from "react-bootstrap-icons"
import { getDoctorDashboard } from "../../services/dashboardService";
import RecentVisitTable from "../../components/RecentVisitTable";
import WeeklyVisitsChart from "../../components/charts/WeeklyVisitsChart";
import DonutDistributionChart from "../../components/charts/DonutDistributionChart";

function DoctorDashboard() {

    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    const doctorId = user.id;

    const [dashboard, setDashboard] = useState({
        todayVisits: 0,
        totalPatients: 0,
        pendingVisits: 0,
        todayFollowups: 0,
        recentVisits: []
    });

    useEffect(() => {
        fetchDashboardStats();
    }, [])

    const fetchDashboardStats = async () => {
        try {
            const response = await getDoctorDashboard(doctorId);
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const completedCount = Math.max(0, dashboard.todayVisits - dashboard.pendingVisits);
    const hasData = completedCount > 0 || dashboard.pendingVisits > 0;
    const statusData = hasData ? [
        { name: "Completed", value: completedCount },
        { name: "Pending", value: dashboard.pendingVisits }
    ] : [];

    return (
        <div className="container-fluid">
            <div className="row g-4 mb-4">
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Today's Visits"} count={dashboard.todayVisits} icon={<CalendarCheck />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Patients"} count={dashboard.totalPatients} icon={<People />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Pending Visits"} count={dashboard.pendingVisits} icon={<HourglassSplit
                    />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Today's Follow-ups"} count={dashboard.todayFollowups} icon={<ClockHistory />} />
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-7">
                    <WeeklyVisitsChart data={dashboard.weeklyVisits} title="My Weekly Consultations" />
                </div>
                <div className="col-12 col-lg-5">
                    <DonutDistributionChart
                        title="Today's Patient Queue"
                        badgeText="Status"
                        colors={["#198754", "#ffc107"]}
                        data={statusData}
                    />
                </div>
            </div>

            <RecentVisitTable recentVisits={dashboard.recentVisits} />
        </div>
    )
}

export default DoctorDashboard