import { PersonBadge, CurrencyRupee, CalendarCheck, People, Calendar, HourglassSplit } from "react-bootstrap-icons"
import DashboardCard from "../../components/DashboardCard"
function DoctorDashboard() {
    return (
        <div className="container-fluid">
            <div className="row g-4">
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Today's Visits"} count={18} icon={<Calendar />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Today's total Patients"} count={120} icon={<People />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Pending Consultations"} count={12} icon={<HourglassSplit />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Completed Visits"} count={6} icon={<CalendarCheck
                    />} />
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard