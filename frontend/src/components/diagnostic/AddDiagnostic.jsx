import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addDiagnostic } from "../../services/diagnosticService";
import DiagnosticForm from "./DiagnosticForm";

function AddDiagnostic() {
    const navigate = useNavigate();
    const initialValues = {
        visitId: "",
        doctorId: "",
        name: ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addDiagnostic(values);
            toast.success("Diagnostic added successfully");
            navigate("/admin/diagnostics/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add diagnostics"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Diagnostic</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/diagnostics")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <DiagnosticForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddDiagnostic;