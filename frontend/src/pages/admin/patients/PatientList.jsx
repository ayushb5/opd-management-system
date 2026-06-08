import { useEffect, useState } from "react";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";
import { deletePatient, getPatients } from "../../../services/patientService";

function PatientList() {

    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const data = await getPatients();
            setPatients(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load patients");
        }
    };

    const handleDelete = async () => {
        try {
            await deletePatient(selectedPatientId);

            toast.success("Receptionist deleted successfully");

            setPatients(
                patients.filter(
                    receptionist => receptionist.id !== selectedPatientId
                )
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete patient");
            console.error(error);
        }
    };

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name?.toLowerCase().includes(search.toLowerCase()) ||
            patient.mobileno?.includes(search)
    );

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
                            placeholder="Search receptionist..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-patient"
                    className="btn btn-primary text-nowrap"
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
                            <th>Mobile Number</th>
                            <th>Doctor</th>
                            <th>Blood Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient) => (
                                <tr key={patient.id}>

                                    <td>{patient.id}</td>
                                    <td className="text-nowrap">{patient.patient_name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.mobileno}</td>
                                    <td className="text-nowrap">
                                        {patient.doctor?.name}
                                    </td>
                                    <td>{patient.blood_group}</td>

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
                                    No receptionists found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Receptionist"
                message="Are you sure you want to delete this receptionist?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default PatientList;