import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import { deletePrescription, getByVisitId } from "../../services/prescriptionService";
import ConfirmationModal from '../ConfirmationModal'
import { toast } from "react-toastify"

function PrescriptionList({ visitId }) {
    const [prescription, setPrescription] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (visitId) {
            fetchPrescription();
        }
    }, [visitId]);

    const fetchPrescription = async () => {
        try {
            const prescriptionData = await getByVisitId(visitId);
            setPrescription(prescriptionData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deletePrescription(selectedPrescriptionId);
            toast.success("Prescription deleted successfully");

            setPrescription(
                prescription.filter(item => item.id !== selectedPrescriptionId)
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete prescription");
            console.error(error);
        }
    }

    const filteredPrescription = prescription.filter((prescription) =>
        prescription.medicine?.medicineName
            ?.toLowerCase()
            .includes(search.toLowerCase())
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
                    to={`add-prescription/${visitId}`}
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
                            <th className="text-nowrap">Medicine Name</th>
                            <th className="text-nowrap">Dose (Qty)</th>
                            <th>Unit</th>
                            <th>Morning</th>
                            <th>Afternoon</th>
                            <th>Evening</th>
                            <th>Duration(Days)</th>
                            <th className="text-nowrap">Total Qty</th>
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
                                    <td>{prescription.doseQuantity}</td>
                                    <td>{prescription.doseUnit}</td>
                                    <td>{prescription.morningDose}</td>
                                    <td>{prescription.afternoonDose}</td>
                                    <td>{prescription.eveningDose}</td>
                                    <td>{prescription.durationDays}</td>
                                    <td>{prescription.totalQuantity}</td>
                                    <td>{prescription.instructions}</td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-prescription/${prescription.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedPrescriptionId(prescription.id);
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
                title="Delete Prescription"
                message="Are you sure you want to delete this prescription?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}

export default PrescriptionList