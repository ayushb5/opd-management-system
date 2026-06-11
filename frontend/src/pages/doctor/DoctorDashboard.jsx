import { PersonBadge, CurrencyRupee, CalendarCheck, People } from "react-bootstrap-icons"
import DashboardCard from "../../components/DashboardCard"
function DoctorDashboard() {
    return (
        <div className="container-fluid">
            <div className="row g-4">
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Patients"} count={120} icon={<People />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Today's Visits"} count={18} icon={<CalendarCheck />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Pending Consultations"} count={12} icon={<PersonBadge />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Earnings"} count={5000} icon={<CurrencyRupee
                    />} />
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard