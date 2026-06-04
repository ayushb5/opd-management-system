import logo from "../assets/logo.png"
import loginBackground from "../assets/backgrounds/loginBackground.jpg"
import { NavLink, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import * as Yup from "yup"
import { Envelope, Lock } from "react-bootstrap-icons"
import { login } from "../services/authService";
import { toast } from "react-toastify"

function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit: async (values) => {
            try {
                const data = await login(values);
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("email", data.email);

                toast.success("Login successful!")

                setTimeout(() => {

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
                    }

                }, 1500);
            } catch (error) {
                if (error.response?.status === 401) {
                    toast.error("Invalid email or password");
                }
                else {
                    toast.error("Something went wrong");
                }
            }
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
        })
    });

    return (
        <div className="container-fluid min-vh-100">
            <div className="row min-vh-100">
                <div className="col-lg-4 d-flex align-items-center justify-content-center">
                    <div className="w-100 p-4 shadow-lg rounded-4 bg-white" style={{ maxWidth: "450px" }}>
                        <div className="d-flex align-items-center">
                            <img src={logo} alt="logo" id="logo" className="img-fluid" style={{ width: "50px" }} />
                            <div className="ms-2">
                                <h3 className="text-primary mb-0">City Care Hospital</h3>
                                <p className="text-muted mb-0">OPD Management Portal</p>
                            </div>
                        </div>
                        <h4 className="mt-4 fw-bold">Welcome Back!</h4>
                        <p className="text-muted">Please Login to continue</p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">
                                    Email<span className="text-danger"> *</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text border-black">
                                        <Envelope />
                                    </span>
                                    <input type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`form-control border-black ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`} placeholder="Enter your Email" />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <small className="text-danger">{formik.errors.email}</small>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Password<span className="text-danger"> *</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text border-black">
                                        <Lock />
                                    </span>
                                    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`form-control border-black ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`} placeholder="Enter your Password" />
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <small className="text-danger">{formik.errors.password}</small>
                                )}
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="form-check user-select-none">
                                    <input className="form-check-input" type="checkbox" id="rememberMe" name="rememberMe" checked={formik.values.rememberMe} onChange={formik.handleChange} />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <NavLink to="/forgot-password" className={"nav-link text-primary"}>Forgot password?</NavLink>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary w-100 py-2 fw-semibold" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-8 d-none d-lg-block">
                    <img src={loginBackground} alt="background Image" className="img-fluid w-100 h-100 rounded-start" style={{ objectFit: "cover" }} />
                </div>
            </div>
        </div>
    )
}

export default Login