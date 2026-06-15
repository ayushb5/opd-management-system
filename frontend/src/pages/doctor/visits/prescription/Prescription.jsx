import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import { deletePrescription, getByVisitId } from "../../../../services/prescriptionService";
import ConfirmationModal from '../../../../components/ConfirmationModal'
import { toast } from "react-toastify"

function Prescription({ id }) {
    const [prescription, setPrescription] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPrescription();
    }, [])

    const fetchPrescription = async (id) => {
        try {
            const prescriptionData = await getByVisitId(id);
            setPrescription(prescriptionData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deletePrescription(selectedDoctorId);
            toast.success("Doctor deleted successfully");

            setPrescription(
                prescription.filter(doctor => doctor.id != selectedDoctorId)
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete doctor");
            console.error(error);
        }
    }

    const filteredPrescription = prescription.filter((prescription) =>
        prescription.medicine.medicineName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h3>Prescription</h3>
            <div className="d-flex align-items-center gap-2 mt-4">

                <div className="flex-grow-1">
                    <div className="input-group w-50">
                        <span className="input-group-text border-black">
                            <Search />
                        </span>
                        <input
                            type="text"
                            className="form-control border-black"
                            placeholder="Search prescription..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-prescription"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Prescription
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medicine Name</th>
                            <th>Dose (Qty)</th>
                            <th>Unit</th>
                            <th>Morning</th>
                            <th>Afternoon</th>
                            <th>Evening</th>
                            <th>Duration(Days)</th>
                            <th>Total Qty</th>
                            <th>Instructions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPrescription.length > 0 ? (
                            filteredPrescription.map((prescription) => (
                                <tr key={prescription.id}>
                                    <td>{prescription.id}</td>
                                    <td className="text-nowrap">{prescription.medicine.medicineName}</td>
                                    <td>{prescription.dosage}</td>
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
                                <td colSpan={11} className="text-center">
                                    No Prescription found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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

export default Prescription