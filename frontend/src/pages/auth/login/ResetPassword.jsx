
function ResetPassword() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="card shadow-sm p-3" style={{ width: "400px" }}>
                <h2 className="text-center mb-3">Reset Password</h2>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control border-black" placeholder="Enter email to get reset password link" />
                </div>
                <div className="text-center mb-1 mt-3">
                    <button type="submit" className="btn btn-primary px-3">Send Link</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword