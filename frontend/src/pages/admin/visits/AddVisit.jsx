import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addVisit } from "../../../services/visitService";
import VisitForm from "../../../components/visit/VisitForm";

function AddVisit() {
    const navigate = useNavigate();
    const initialValues = {
        doctorId: "",
        patientId: "",

        // Visit Information
        visitDate: "",

        // Complaints & Diagnosis
        complaints: "",
        diagnosis: "",
        advice: "",

        // Vitals
        bp: "",
        pulse: "",
        saturation: "",
        temperature: "",
        respirationRate: "",
        weight: "",

        // Sugar & Laboratory
        fastingSugar: "",
        ppSugar: "",
        randomSugar: "",
        ureaCreatinine: "",
        hb: "",
        ecg: "",

        // History
        pastHistory: "",
        currentMedication: "",
        additionalNotes: "",

        // Clinical Examination
        edema: "",
        pallor: "",
        jaundice: "",
        cvs: "",
        rs: "",
        pa: "",
        cns: "",

        // Follow Up
        followupDate: ""
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addVisit(values);
            toast.success("Visit added successfully");
            navigate("/admin/visits/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add visits"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Visit</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/visits")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <VisitForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddVisit;