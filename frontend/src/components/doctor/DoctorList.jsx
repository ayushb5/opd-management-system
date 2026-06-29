import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import { deleteDoctor, getDoctors } from "../../services/doctorService";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify"
import Pagination from "../Pagination";

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, [currentPage, pageSize, search])

    console.log(search);

    const fetchDoctors = async () => {
        try {
            const doctorsData = await getDoctors(currentPage, pageSize, search);
            setDoctors(doctorsData.content);
            setTotalPages(doctorsData.totalPages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load doctors");
        }
    }

    console.log(doctors);

    const handleDelete = async () => {
        try {
            await deleteDoctor(selectedDoctorId);
            toast.success("Doctor deleted successfully");
            await fetchDoctors();
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete doctor");
            console.error(error);
        }
    }

    return (
        <>
            <div className="d-flex align-items-center gap-2">

                <div className="flex-grow-1">
                    <div className="input-group">
                        <span className="input-group-text border-black">
                            <Search />
                        </span>
                        <input
                            type="text"
                            className="form-control border-black"
                            placeholder="Search doctors..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-doctor"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Doctor
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td className="text-nowrap">{doctor.name}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.mobileNo}</td>
                                    <td>{doctor.email}</td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-doctor/${doctor.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedDoctorId(doctor.id);
                                                setShowModal(true);
                                            }}
                                        >
                                            <Trash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No doctors found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            <ConfirmationModal
                show={showModal}
                title="Delete Doctor"
                message="Are you sure you want to delete this doctor?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}

export default DoctorList