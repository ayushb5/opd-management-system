import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { resetPassword, validateResetToken } from "../../services/authService";
import { toast } from "react-toastify";
function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await resetPassword({ token, newPassword: password.newPassword, confirmPassword: password.confirmPassword });
            toast.success("Password reset successfully");
            setPassword({ newPassword: "", confirmPassword: "" });
            navigate("/");
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.data) {
                Object.values(error.response.data).forEach((message) => {
                    toast.error(message);
                });
            } else {
                toast.error("Failed to reset password");
            }
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        try {
            await validateResetToken(token);
            setIsValid(true);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Invalid reset link";
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h4>Validating reset link...</h4>
            </div>
        );
    }

    if (!isValid) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow p-4 text-center">
                    <h3 className="text-danger">
                        {errorMessage}
                    </h3>
                </div>
            </div>
        )
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-body p-4">

                    <h3 className="text-center text-primary mb-4">
                        Reset Password
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                New Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={password.newPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={password.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Reset Password
                        </button>

                    </form>

                    <div className="text-center mt-3">
                        <NavLink to="/" className="nav-link text-primary">
                            Back to Login
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResetPassword