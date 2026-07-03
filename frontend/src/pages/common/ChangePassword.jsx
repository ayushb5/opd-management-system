import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"
import { changeAdminPassword } from "../../services/adminService"
import { changeDoctorPassword } from "../../services/doctorService"
import { changeReceptionistPassword } from "../../services/receptionistService"

function ChangePassword() {

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const { user } = useOutletContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const resetForm = () => {
        setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    }

    const handleUpdate = async () => {
        try {
            if (user.role === "ADMIN") {
                await changeAdminPassword(user.id, password);
            } else if (user.role === "DOCTOR") {
                await changeDoctorPassword(user.id, password);
            } else if (user.role === "RECEPTIONIST") {
                await changeReceptionistPassword(user.id, password);
            }
            toast.success("Password changed successfully");
            resetForm();
            navigate(`/${user.role.toLowerCase()}/profile`);
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.data) {
                Object.values(error.response.data).forEach(message => {
                    toast.error(message);
                });
            } else {
                toast.error("Failed to change password");
            }
        }
    }

    const handleCancel = () => {
        resetForm();
        navigate(`/${user.role.toLowerCase()}/profile`);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-5">
                <div className="card">
                    <div className="card-header">
                        <h4 className="mb-0">Change Password</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate();
                        }}>
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                <input type="password" className="form-control" name="currentPassword" autoComplete="current-password" value={password.currentPassword} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input type="password" className="form-control" name="newPassword" autoComplete="new-password" value={password.newPassword} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" autoComplete="new-password" value={password.confirmPassword} onChange={handleChange} required />
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                <button type="submit" className="btn btn-success">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ChangePassword