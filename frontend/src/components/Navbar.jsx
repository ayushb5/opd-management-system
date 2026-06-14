import { List } from "react-bootstrap-icons";

function Navbar() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );
    return (
        <div className="bg-white shadow-sm p-2 d-flex align-items-center">

            <button className="btn btn-outline-primary d-lg-none me-3" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffCanvas">
                <List />
            </button>
            <h5 className="mb-0">
                Dashboard
            </h5>

            <div className="ms-auto d-flex align-items-center">
                <span className="badge bg-primary me-2 ">
                    {user.role}
                </span>

                <div className="d-none d-md-block">
                    <small className="text-muted d-block">
                        Welcome
                    </small>

                    <small className="fw-semibold">
                        {user.name}
                    </small>
                </div>
            </div>

        </div>
    )
}

export default Navbar