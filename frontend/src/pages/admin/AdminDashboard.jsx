import DashboardCard from "../../components/DashboardCard"
import { PersonBadge, People, Person, CalendarCheck } from "react-bootstrap-icons"
function AdminDashboard() {
    return (
        <div className="container-fluid">
            <div className="row g-4">
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Doctors"} count={12} icon={<PersonBadge />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Receptionist"} count={5} icon={<People />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Patients"} count={120} icon={<Person />} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <DashboardCard title={"Total Visits"} count={18} icon={<CalendarCheck />} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard