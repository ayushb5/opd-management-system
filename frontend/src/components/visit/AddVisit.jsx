import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addVisit } from "../../services/visitService";
import VisitForm from "./VisitForm";

function AddVisit() {
    const navigate = useNavigate();

    const location = useLocation();
    const followUpData = location.state;

    const initialValues = {
        doctorId: followUpData?.doctorId || "",
        patientId: followUpData?.patientId || "",

        // Visit Information
        visitDate: new Date().toLocaleDateString("en-CA"),

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

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    console.log(role);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addVisit(values);
            toast.success("Visit added successfully");
            navigate(
                role === "DOCTOR"
                    ? "/doctor/visits"
                    : "/admin/visits"
            );
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
                    onClick={() => navigate(
                        role === "DOCTOR"
                            ? "/doctor/visits"
                            : "/admin/visits"
                    )}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div >
            <VisitForm initialValues={initialValues} onSubmit={handleSubmit} isFollowUp={followUpData?.isFollowUp} />
        </>
    )
}

export default AddVisit;