import { useEffect, useState } from "react"
import { Pencil, PersonCircle } from "react-bootstrap-icons";
import { getAdminById, updateAdmin } from "../../services/adminService";
import { getDoctorById, updateDoctor } from "../../services/doctorService"
import { getReceptionistById, updateReceptionist } from "../../services/receptionistService";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        mobileNo: "",
        specialization: "",
        clinicName: "",
        address: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const { user, setUser } = useOutletContext();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            if (user.role === "ADMIN") {
                const data = await getAdminById(user.id);
                setProfile(data);
            } else if (user.role === "DOCTOR") {
                const data = await getDoctorById(user.id);
                setProfile(data);
            } else if (user.role === "RECEPTIONIST") {
                const data = await getReceptionistById(user.id);
                setProfile(data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load profile details")
        }
    }

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    const handleCancel = () => {
        fetchProfile();
        setIsEditing(false);
    }

    const handleUpdate = async () => {
        try {
            if (user.role === "ADMIN") {
                console.log(profile);
                await updateAdmin(user.id, profile);
            } else if (user.role === "DOCTOR") {
                await updateDoctor(user.id, profile);
            } else if (user.role === "RECEPTIONIST") {
                await updateReceptionist(user.id, profile);
            }

            await fetchProfile();

            const updatedUser = {
                ...user,
                name: profile.name
            };
            setUser(updatedUser);
            if (localStorage.getItem("user")) {
                localStorage.setItem("user", JSON.stringify(updatedUser));
            } else {
                sessionStorage.setItem("user", JSON.stringify(updatedUser));
            }
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            const errors = error.response?.data;
            Object.values(errors).forEach((message) => {
                toast.error(message);
            });
        }
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">My Profile</h4>
                            {!isEditing ? (
                                <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                                    <Pencil className="me-2" />
                                    Edit
                                </button>
                            ) : null}
                        </div>
                        <div className="card-body text-center">
                            <PersonCircle size={90} className="text-primary" />
                            <h4 className="mt-3">
                                {profile.name || user.name}
                            </h4>

                            <p className="badge bg-primary">
                                {user.role}
                            </p>
                            <hr />
                            <h6 className="text-uppercase text-primary fw-bold mb-3 text-start">Personal Information</h6>
                            <div className="my-2">
                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2">Name: </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                        />
                                    ) : (<span className="fw-semibold ms-2">{profile.name}</span>)}
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2">Email: </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            value={profile.email}
                                            readOnly
                                        />
                                    ) : (<span className="fw-semibold ms-2">{profile.email}</span>)}

                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <label className="me-2 text-nowrap">Mobile Number: </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            className="form-control form-control-sm"
                                            name="mobileNo"
                                            value={profile.mobileNo}
                                            onChange={handleChange}
                                        />
                                    ) : (<span className="fw-semibold ms-2">{profile.mobileNo || "-"}</span>)}
                                </div>
                            </div>

                            {user.role === "DOCTOR" && (
                                <>
                                    <hr />
                                    <h6 className="text-uppercase text-primary fw-bold mb-3 text-start">Doctor Information</h6>
                                    <div className="d-flex align-items-center mb-2">
                                        <label className="me-2">Specialization: </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="specialization"
                                                value={profile.specialization}
                                                onChange={handleChange}
                                            />
                                        ) : (<span className="fw-semibold ms-2">{profile.specialization || "-"}</span>)}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <label className="me-2 text-nowrap">Clinic Name: </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="clinicName"
                                                value={profile.clinicName}
                                                onChange={handleChange}
                                            />
                                        ) : (<span className="fw-semibold ms-2">{profile.clinicName || "-"}</span>)}
                                    </div>
                                    <div className="d-flex align-items-start mb-2">
                                        <label className="me-2">Address: </label>
                                        {isEditing ? (
                                            <textarea
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="address"
                                                rows={3}
                                                value={profile.address}
                                                onChange={handleChange}
                                            />
                                        ) : (<span className="fw-semibold ms-2">{profile.address || "-"}</span>)}
                                    </div>
                                </>
                            )}

                            {isEditing ? (
                                <div className="d-flex justify-content-end gap-3 mt-4">
                                    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-success" onClick={handleUpdate}>Update Profile</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Profile