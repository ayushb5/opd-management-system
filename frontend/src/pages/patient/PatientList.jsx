import { useEffect, useState } from "react"
import { deletePatient, getAllPatients } from "../../services/patientService"
import { NavLink } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const data = await getAllPatients();
            setPatients(data);
            setFilteredPatients(data);
        } catch (error) {
            toast.error("Failed to load patients")
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.trim() === "") {
            setFilteredPatients(patients);
            return;
        }
        const filtered = patients.filter((patient) =>
            patient.patient_name
                .toLowerCase()
                .includes(value.toLowerCase())
        );
        setFilteredPatients(filtered);
    }

    const confirmDelete = async () => {
        try {
            setDeleteLoading(true);
            await deletePatient(selectedPatientId);
            setShowModal(false);
            setSelectedPatientId(null);
            toast.success("Patient deleted successfully");
            fetchPatients();
        } catch (error) {
            toast.error("Failed to delete patient");
            console.log(error);
        } finally {
            setDeleteLoading(false);
        }
    }

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center mb-2">
                <input type="text" placeholder="Search here.." className="p-1" value={search} onChange={handleSearch} />
                <NavLink to={"/patients/add-patient"} className="btn btn-success ms-2">Add Patient</NavLink>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Doctor</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Blood Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={"8"} className="text-center">
                                <Spinner />
                            </td>
                        </tr>
                    ) : filteredPatients.length > 0 ? (
                        filteredPatients.map((patient, index) => (
                            <tr key={patient.id}>
                                <td>{index + 1}</td>
                                <td>{patient.patient_name}</td>
                                <td>{patient.doctor.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.mobileno}</td>
                                <td>{patient.blood_group}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <NavLink to={`/patients/edit-patient/${patient.id}`} className={"btn btn-warning btn-sm"}>Edit</NavLink>
                                        <button onClick={() => {
                                            setSelectedPatientId(patient.id);
                                            setShowModal(true);
                                        }} className={"btn btn-danger btn-sm"}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={"8"} className="text-center">
                                No Patients found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ConfirmModal show={showModal} title="Delete Patient" message="Are you sure you want to delete this patient?" onConfirm={confirmDelete} onClose={() => setShowModal(false)} deleteLoading={deleteLoading} />
        </ >
    )
}

export default PatientList