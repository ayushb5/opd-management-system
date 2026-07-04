import { useState } from "react";
import { NavLink } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await forgotPassword({ email });
            toast.success("Password reset link sent. Please check your email.");
            setEmail("");
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.data) {
                Object.values(error.response.data).forEach((message) => {
                    toast.error(message);
                });
            } else {
                toast.error("Failed to send reset link")
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card shadow forgot-pass-card">
                    <div className="card-body p-4">
                        <h3 className="text-center text-primary mb-4">Forgot Password</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input type="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <NavLink to="/" className="nav-link text-primary">Back to Login</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword