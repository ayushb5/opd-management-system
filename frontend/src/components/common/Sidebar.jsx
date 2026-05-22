import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <>
            <div className="bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
                <h5>Menu</h5>
                <ul className="nav flex-column mt-4">
                    <li className="nav-item mb-2">
                        <NavLink to={"/"} className={"nav-link"}>Dashboard</NavLink >
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to={"/patients"} className={"nav-link"}>Patients</NavLink >
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to={"/doctors"} className={"nav-link"}>Doctors</NavLink >
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to={"/visits"} className={"nav-link"}>Visits</NavLink >
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar