import { NavLink } from "react-router-dom";
import { ExclamationTriangle } from "react-bootstrap-icons";

function PageNotFound() {

    const user = JSON.parse(
        localStorage.getItem("user") ||
        sessionStorage.getItem("user") ||
        "null"
    );

    let redirectPath = "/";

    if (user) {
        switch (user.role) {
            case "ADMIN":
                redirectPath = "/admin/dashboard";
                break;

            case "DOCTOR":
                redirectPath = "/doctor/dashboard";
                break;

            case "RECEPTIONIST":
                redirectPath = "/receptionist/dashboard";
                break;

            default:
                redirectPath = "/";
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">

                <ExclamationTriangle
                    size={80}
                    className="text-warning mb-3"
                />

                <h1 className="display-1 fw-bold text-primary">
                    404
                </h1>

                <h3 className="mb-3">
                    Page Not Found
                </h3>

                <p className="text-muted mb-4">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <NavLink
                    to={redirectPath}
                    className="btn btn-primary px-4"
                >
                    {user ? "Go to Dashboard" : "Back to Login"}
                </NavLink>

            </div>
        </div>
    );
}

export default PageNotFound;