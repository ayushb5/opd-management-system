import { useFormik } from "formik"
import { NavLink } from "react-router-dom"
import * as Yup from "yup";
import axiosInstance from "../../../api/axiosInstance";
function login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Minimum 6 characters required")
                .required("Password is required"),
            role: Yup.string()
                .required("Role is required")
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axiosInstance.post("/auth/login", values);
            } catch (error) {
                const
            }
        }
    })
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="card shadow-sm p-3" style={{ width: "400px" }}>
                <h2 className="text-center mb-3">Login</h2>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control border-black" />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control border-black" />
                </div>
                <div className="mb-2">
                    <label htmlFor="role" form-label>Role</label>
                    <select name="role" id="role" className="form-select border-black">
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Receptionist">Receptionist</option>
                    </select>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-6">
                        <div className="form-check user-select-none">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                    </div>
                    <div className="col-md-6 col-6 text-end">
                        <NavLink to={"/auth/login/reset-password"} className="text-decoration-none">Forgot password?</NavLink>
                    </div>
                </div>
                <div className="text-center mb-1 mt-3">
                    <button className="btn btn-primary px-3">Login</button>
                </div>
                <div className="text-center mt-3">
                    <span className="me-1">Don't have an account?</span>
                    <NavLink
                        to="/auth/signup"
                        className="text-decoration-none fw-semibold"
                    >
                        Sign up
                    </NavLink>
                </div>
            </form>

        </div>
    )
}

export default login