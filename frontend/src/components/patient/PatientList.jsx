import { useEffect, useState } from "react";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import { deletePatient, getPatients } from "../../services/patientService";
import Pagination from "../Pagination";

function PatientList() {

    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, [currentPage, pageSize, search]);

    const fetchPatients = async () => {
        try {
            const data = await getPatients(currentPage, pageSize, search);
            setPatients(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load patients");
        }
    };

    const handleDelete = async () => {
        try {
            await deletePatient(selectedPatientId);

            toast.success("Patient deleted successfully");

            await fetchPatients();

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete patient");
            console.error(error);
        }
    };

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
                            placeholder="Search patient..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-patient"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Patient
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th className="text-nowrap">Mobile Number</th>
                            <th>Doctor</th>
                            <th className="text-nowrap">Blood Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <tr key={patient.id}>

                                    <td>{patient.id}</td>
                                    <td className="text-nowrap">{patient.patientName}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.mobileNo}</td>
                                    <td className="text-nowrap">
                                        {patient.doctor?.name}
                                    </td>
                                    <td>{patient.bloodGroup}</td>

                                    <td className="text-nowrap">

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `edit-patient/${patient.id}`
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedPatientId(
                                                    patient.id
                                                );
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
                                <td
                                    colSpan={7}
                                    className="text-center"
                                >
                                    No patients found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            <ConfirmationModal
                show={showModal}
                title="Delete Patient"
                message="Are you sure you want to delete this Patient?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default PatientList;