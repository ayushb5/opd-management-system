import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "react-bootstrap-icons";
import {
    getDiagnostic,
    updateDiagnostic
} from "../../services/diagnosticService";
import DiagnosticForm from "./DiagnosticForm";

function EditDiagnostic() {
    const { visitId, diagnosticId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.startsWith("/doctor/visits")
        ? "/doctor/visits"
        : "/admin/visits";

    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState(null);

    const [initialValues, setInitialValues] = useState({
        name: ""
    });

    useEffect(() => {
        const fetchDiagnostic = async () => {
            try {
                const diagnostic = await getDiagnostic(diagnosticId);

                setInitialValues({
                    name: diagnostic.name || ""
                });
                setDoctorId(diagnostic.doctor?.id || null);
            } catch (error) {
                toast.error("Failed to load diagnostic");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiagnostic();
    }, [diagnosticId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (!doctorId) {
                toast.error("Cannot update diagnostic: doctor is missing.");
                return;
            }

            await updateDiagnostic(diagnosticId, {
                visitId: Number(visitId),
                doctorId,
                name: values.name
            });

            toast.success("Diagnostic updated successfully");

            navigate(`${basePath}/${visitId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update diagnostic"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">
                    Edit Diagnostic
                </span>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate(`${basePath}/${visitId}`)
                    }
                >
                    <ArrowLeft className="me-2" />
                    Back to Visit
                </button>
            </div>

            <DiagnosticForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEdit={true}
            />
        </>
    );
}

export default EditDiagnostic;