import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getDiagnostic, updateDiagnostic } from "../../services/diagnosticService";
import DiagnosticForm from "./DiagnosticForm";

function EditDiagnostic() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        visitId: "",
        doctorId: "",
        name: ""
    });

    useEffect(() => {
        fetchDiagnostic();
    }, []);

    const fetchDiagnostic = async () => {
        try {
            const diagnostic = await getDiagnostic(id);
            setInitialValues({
                visitId: diagnostic.visit.id || "",
                doctorId: diagnostic.doctor.id || "",
                name: diagnostic.name || ""
            })
        } catch (error) {
            toast.error("Failed to load diagnostic");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateDiagnostic(id, values);
            toast.success("Diagnostic updated successfully");
            navigate("/admin/diagnostics/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update diagnostic");
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
                <span className="fs-2 fw-semibold">Edit Diagnostic</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/diagnostics")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <DiagnosticForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditDiagnostic