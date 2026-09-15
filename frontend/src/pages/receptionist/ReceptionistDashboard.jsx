import { useEffect, useState } from "react"
import DashboardCard from "../../components/DashboardCard"
import { CalendarCheck, People, HourglassSplit, PersonPlus } from "react-bootstrap-icons"
import { getReceptionistDashboard } from "../../services/dashboardService";
import RecentVisitTable from "../../components/RecentVisitTable";
import WeeklyVisitsChart from "../../components/charts/WeeklyVisitsChart";
import DonutDistributionChart from "../../components/charts/DonutDistributionChart";

function ReceptionistDashboard() {
    const [dashboard, setDashboard] = useState({
        todayVisits: 0,
        totalPatients: 0,
        pendingVisits: 0,
        todayNewPatients: 0,
        recentVisits: []
    });

    useEffect(() => {
        fetchDashboardStats();
    }, [])

    const fetchDashboardStats = async () => {
        try {
            const response = await getReceptionistDashboard();
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const returningPatients = Math.max(0, dashboard.todayVisits - dashboard.todayNewPatients);
    const patientTypeData = [
        { name: "New Patients", value: dashboard.todayNewPatients },
        { name: "Returning", value: returningPatients }
    ];

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
                    <DashboardCard title={"Today's New Patients"} count={dashboard.todayNewPatients} icon={<PersonPlus />} />
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-7">
                    <WeeklyVisitsChart data={dashboard.weeklyVisits} title="Hospital Weekly Flow" />
                </div>
                <div className="col-12 col-lg-5">
                    <DonutDistributionChart
                        title="Patient Registrations"
                        badgeText="Today"
                        colors={["#0dcaf0", "#6c757d"]}
                        data={patientTypeData}
                    />
                </div>
            </div>

            <RecentVisitTable recentVisits={dashboard.recentVisits} />
        </div>
    )
}

export default ReceptionistDashboard