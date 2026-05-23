import { useEffect, useState } from "react"
import { deleteDoctor, getAllDoctors } from "../../services/doctorService";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify"
import ConfirmModal from "../../components/common/ConfirmModal";
import Spinner from "../../components/common/Spinner";

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const data = await getAllDoctors();
            setDoctors(data);
            setFilteredDoctors(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.trim() === "") {
            setFilteredDoctors(doctors);
            return;
        }
        const filtered = doctors.filter((doctor) =>
            doctor.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredDoctors(filtered);
    }

    const confirmDelete = async () => {
        try {
            setDeleteLoading(true);
            await deleteDoctor(selectedDoctorId);
            setShowModal(false);
            setSelectedDoctorId(null);
            toast.success("Doctor deleted successfully");
            fetchDoctors();
        } catch (error) {
            toast.error("Failed to delete doctor");
            console.log(error);
        } finally {
            setDeleteLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center mb-2">
                <input type="text" placeholder="Search here.." className="p-1" value={search} onChange={handleSearch} />
                <NavLink to={"/doctors/add-doctor"} className="btn btn-success ms-2">Add Doctor</NavLink>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialization</th>
                        <th>Clinic Name</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={9} className="text-center py-5">
                                <Spinner />
                            </td>
                        </tr>
                    ) : filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor, index) => (
                            <tr key={doctor.id}>
                                <td>{index + 1}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.clinic_name}</td>
                                <td>{doctor.address}</td>
                                <td>{doctor.mobileno}</td>
                                <td>{doctor.status}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <NavLink to={`/doctors/edit-doctor/${doctor.id}`} className={"btn btn-warning btn-sm"}>Edit</NavLink>
                                        <button onClick={() => {
                                            setSelectedDoctorId(doctor.id);
                                            setShowModal(true);
                                        }} className={"btn btn-danger btn-sm"}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center">
                                No Doctors found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ConfirmModal show={showModal} title={"Delete Doctor"} message="Are you sure you want to delete this doctor?" onConfirm={confirmDelete} onClose={() => setShowModal(false)} deleteLoading={deleteLoading} />
        </>
    )
}

export default DoctorList