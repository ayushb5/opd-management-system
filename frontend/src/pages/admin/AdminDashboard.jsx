import { useEffect, useState } from "react"
import DashboardCard from "../../components/DashboardCard"
import { PersonBadge, CalendarCheck, People, HourglassSplit } from "react-bootstrap-icons"
import { getAdminDashboard } from "../../services/dashboardService";
import RecentVisitTable from "../../components/RecentVisitTable";

function AdminDashboard() {
    const [dashboard, setDashboard] = useState({
        todayVisits: 0,
        totalPatients: 0,
        totalDoctors: 0,
        pendingVisits: 0,
        recentVisits: []
    });

    useEffect(() => {
        fetchDashboardStats();
    }, [])

    const fetchDashboardStats = async () => {
        try {
            const response = await getAdminDashboard();
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
        }
    }

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
                    <DashboardCard title={"Total Doctors"} count={dashboard.totalDoctors} icon={<PersonBadge />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Pending Visits"} count={dashboard.pendingVisits} icon={<HourglassSplit
                    />} />
                </div>
            </div>

            <RecentVisitTable recentVisits={dashboard.recentVisits} />
        </div>
    )
}

export default AdminDashboard