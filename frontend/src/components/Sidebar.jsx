import { NavLink, useNavigate } from "react-router-dom"
import { Grid, PersonBadge, People, ArrowBarRight, PersonVcard, Clipboard2Check, Capsule, Diagram3Fill } from "react-bootstrap-icons"
import { toast } from "react-toastify"

function Sidebar({ showTitle = true }) {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const role = user.role;
    const navigate = useNavigate();

    const menuItems = {
        ADMIN: [
            { name: "Dashboard", path: "/admin/dashboard", icon: <Grid /> },
            { name: "Doctors", path: "/admin/doctors", icon: <PersonBadge /> },
            { name: "Receptionists", path: "/admin/receptionists", icon: <People /> },
            { name: "Patients", path: "/admin/patients", icon: <PersonVcard /> },
            { name: "Visits", path: "/admin/visits", icon: <Clipboard2Check /> },
            { name: "Medicines", path: "/admin/medicines", icon: <Capsule /> },
            { name: "Referral Centers", path: "/admin/referral-centers", icon: <Diagram3Fill /> }
        ],
        DOCTOR: [
            { name: "Dashboard", path: "/doctor/dashboard", icon: <Grid /> },
            { name: "Visits", path: "/doctor/visits", icon: <Clipboard2Check /> },
            { name: "Appointments", path: "/doctor/appointments" }
        ],
        RECEPTIONIST: [
            { name: "Dashboard", path: "/receptionist/dashboard" },
            { name: "Patients", path: "/receptionist/patients" }
        ]
    }

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout successful!");
        navigate("/");
    }

    return (
        <div className="bg-dark text-white h-100 w-100 p-3 d-flex flex-column">
            {
                showTitle && (
                    <>
                        <h5>City Care Hospital</h5>
                        <hr />
                    </>
                )
            }
            {
                menuItems[role]?.map((item) => (
                    <NavLink key={item.path} to={item.path} className={({ isActive }) => {
                        return `nav-link rounded px-3 fw-semibold py-2 mb-2 sidebar-link ${isActive ? "bg-warning text-dark fw-bold" : "text-white"
                            }`
                    }}>
                        <span className="me-2">{item.icon}</span>
                        {item.name}
                    </NavLink>
                ))
            }

            <div className="mt-auto">
                <button className="btn btn-danger fw-semibold w-100" onClick={handleLogout}>
                    <span className="me-2"><ArrowBarRight /></span>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar