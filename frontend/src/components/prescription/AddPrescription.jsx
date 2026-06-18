import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { addPrescription } from "../../services/prescriptionService";
import PrescriptionForm from "./PrescriptionForm";

function AddPrescription() {
    const { visitId } = useParams();

    const navigate = useNavigate();
    const initialValues = {
        visitId,

        medicineId: "",

        doseQuantity: "1",
        doseUnit: "Tablet",

        morningDose: 1,
        afternoonDose: 0,
        eveningDose: 1,

        durationDays: 5,

        instructions: "",
        quantityNote: ""
    }

    const handleSubmit = async (
        values,
        { setSubmitting }
    ) => {
        try {
            await addPrescription(values);

            toast.success(
                "Prescription added successfully"
            );

            navigate(`/doctor/visits/${visitId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add prescription"
            );
            console.log(error.response?.data);
            console.log(error.response?.status);
            console.log(error.config?.data);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Prescription</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/doctor/visits/${visitId}`)}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <PrescriptionForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddPrescription