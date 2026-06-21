import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { addDiagnostic } from "../../services/diagnosticService";
import { getVisit } from "../../services/visitService";
import DiagnosticForm from "./DiagnosticForm";

function AddDiagnostic() {
    const { visitId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.startsWith("/doctor/visits")
        ? "/doctor/visits"
        : "/admin/visits";
    const [visit, setVisit] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialValues = {
        name: ""
    };

    useEffect(() => {
        const fetchVisit = async () => {
            try {
                const data = await getVisit(visitId);
                setVisit(data);
            } catch (error) {
                toast.error("Failed to load visit details");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVisit();
    }, [visitId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (!visit?.doctor?.id) {
                toast.error("Cannot add diagnostic: visit doctor is missing.");
                return;
            }

            await addDiagnostic({
                visitId: Number(visitId),
                doctorId: visit.doctor.id,
                name: values.name
            });

            toast.success("Diagnostic added successfully");

            navigate(`${basePath}/${visitId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add diagnostic"
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
                <span className="fs-2 fw-semibold">Add Diagnostic</span>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`${basePath}/${visitId}`)}
                >
                    <ArrowLeft className="me-2" />
                    Back to Visit
                </button>
            </div>

            <DiagnosticForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default AddDiagnostic;