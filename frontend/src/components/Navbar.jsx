import { BoxArrowRight, Key, List, PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ user }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logout successful!");
        navigate("/");
    }

    return (
        <div className="bg-white shadow-sm p-2 d-flex align-items-center">

            <button className="btn btn-outline-primary d-lg-none me-3" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffCanvas">
                <List />
            </button>
            <h5 className="mb-0">
                Dashboard
            </h5>

            <div className="ms-auto dropdown">
                <div className="d-flex align-items-center dropdown-toggle user-select-none"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                >
                    <span className="badge bg-primary me-2">{user?.role}</span>
                    <div className="d-none d-md-block text-end me-2">
                        <small className="fw-semibold">{user.name}</small>
                    </div>
                    <PersonCircle size={38} className="text-primary" />
                </div>

                <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                        <h6 className="dropdown-header">{user.name}</h6>
                    </li>
                    <li>
                        <span className="dropdown-item-text text-muted">
                            {user.email}
                        </span>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => navigate(`/${user?.role.toLowerCase()}/profile`)}>
                            <PersonCircle className="me-2" />
                            My Profile
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => navigate(`/${user?.role.toLowerCase()}/change-password`)}>
                            <Key className="me-2" />
                            Change Password
                        </button>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                            <BoxArrowRight className="me-2" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar