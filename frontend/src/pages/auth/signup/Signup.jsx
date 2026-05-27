import { NavLink } from "react-router-dom"

function Signup() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form className="card shadow-sm p-3" style={{ width: "400px" }}>
                    <h2 className="text-center mb-2">Signup</h2>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control border-black" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control border-black" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control border-black" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPass" className="form-label">Confirm Password</label>
                        <input type="password" name="confirmPass" className="form-control border-black" />
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

                    <div className="text-center mb-1 mt-3">
                        <button className="btn btn-primary px-3">Signup</button>
                    </div>
                    <div className="text-center mt-3">
                        <span className="me-1">Already have an account?</span>
                        <NavLink
                            to="/auth/login"
                            className="text-decoration-none fw-semibold"
                        >
                            Login
                        </NavLink>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Signup