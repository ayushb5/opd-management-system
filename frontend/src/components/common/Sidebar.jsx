import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <>
            <div className="bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
                <h5>Menu</h5>
                <ul className="nav flex-column mt-4">
                    <li className="nav-item mb-2">
                        <NavLink to={"/"} className={({ isActive }) =>
                            isActive ? "bg-primary nav-link text-white" : "nav-link text-black"
                        }>Dashboard</NavLink >
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to={"/patients"} className={({ isActive }) =>
                            isActive ? "bg-primary nav-link text-white" : "nav-link text-black"
                        }>Patients</NavLink >
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to={"/doctors"} className={({ isActive }) =>
                            isActive ? "bg-primary nav-link text-white" : "nav-link text-black"
                        }>Doctors</NavLink >
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to={"/visits"} className={({ isActive }) =>
                            isActive ? "bg-primary nav-link text-white" : "nav-link text-black"
                        }>Visits</NavLink >
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar