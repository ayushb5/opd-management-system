import { List } from "react-bootstrap-icons";

function Navbar() {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    return (
        <div className="bg-white shadow-sm p-3 d-flex align-items-center">

            <button className="btn btn-outline-primary d-lg-none me-3" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffCanvas">
                <List />
            </button>
            <h5 className="mb-0">
                Dashboard
            </h5>

            <div className="ms-auto d-flex align-items-center">
                <span className="badge bg-primary me-2 ">
                    {role}
                </span>

                <div className="d-none d-md-block">
                    <small className="text-muted d-block">
                        Welcome
                    </small>

                    <small className="fw-semibold">
                        {email}
                    </small>
                </div>
            </div>

        </div>
    )
}

export default Navbar