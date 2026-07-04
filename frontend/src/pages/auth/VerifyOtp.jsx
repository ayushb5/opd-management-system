import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyOtp } from "../../services/authService";
import { toast } from "react-toastify";

function VerifyOtp() {

    const navigate = useNavigate();
    const { state } = useLocation();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await verifyOtp({ email: state.email, otp });
            if (state.rememberMe) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data));
            }
            toast.success("Login successful!");

            switch (data.role) {

                case "ADMIN":
                    navigate("/admin/dashboard");
                    break;

                case "DOCTOR":
                    navigate("/doctor/dashboard");
                    break;

                case "RECEPTIONIST":
                    navigate("/receptionist/dashboard");
                    break;

                default:
                    navigate("/");
            }
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.data) {
                Object.values(error.response.data).forEach(message => {
                    toast.error(message);
                });
            } else {
                toast.error("OTP verification failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow" style={{ width: "400px" }}>
                <div className="card-body p-4">

                    <h3 className="text-center text-primary mb-4">
                        Verify OTP
                    </h3>

                    <p className="text-center text-muted">
                        We've sent a verification code to
                    </p>

                    <p className="text-center fw-semibold">
                        {state?.email}
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                className="form-control text-center"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                autoComplete="one-time-code"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                    </form>

                    <div className="text-center mt-3">
                        <NavLink
                            to="/"
                            className="nav-link text-primary"
                        >
                            Back to Login
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;