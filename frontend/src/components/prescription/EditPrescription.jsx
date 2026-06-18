import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import PrescriptionForm from "./PrescriptionForm";
import { getPrescription, updatePrescription } from "../../services/prescriptionService";

function EditPrescription() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        visitId: "",

        medicineId: "",

        doseQuantity: "1",
        doseUnit: "Tablet",

        morningDose: 1,
        afternoonDose: 0,
        eveningDose: 1,

        durationDays: 5,

        instructions: "",
        quantityNote: ""
    });

    useEffect(() => {
        if (id) {
            fetchPrescription();
        }
    }, [id]);

    const fetchPrescription = async () => {
        try {
            const prescription = await getPrescription(id);
            setInitialValues({
                visitId: prescription.visit.id,

                medicineId: prescription.medicine.id,

                doseQuantity:
                    prescription.doseQuantity,

                doseUnit:
                    prescription.doseUnit,

                morningDose:
                    prescription.morningDose,

                afternoonDose:
                    prescription.afternoonDose,

                eveningDose:
                    prescription.eveningDose,

                durationDays:
                    prescription.durationDays,

                instructions:
                    prescription.instructions || "",

                quantityNote:
                    prescription.quantityNote || ""
            })
        } catch (error) {
            toast.error("Failed to load prescription");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updatePrescription(id, values);
            toast.success("Prescription updated successfully");
            navigate(-1);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update prescription");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Edit Prescription</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <PrescriptionForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditPrescription