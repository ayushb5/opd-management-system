import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { addPathologyTest } from "../../services/pathologyTestService";
import VisitPathologyTestForm from "./VisitPathologyTestForm";

function AddVisitPathologyTest() {
    const { visitId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.startsWith("/doctor/visits")
        ? "/doctor/visits"
        : "/admin/visits";

    const initialValues = {
        testMasterId: "",
        result: "",
        remarks: "",
        reportFile: ""
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addPathologyTest({
                visitId: Number(visitId),
                testMasterId: Number(values.testMasterId),
                result: values.result,
                remarks: values.remarks,
                reportFile: values.reportFile
            });

            toast.success("Pathology test added successfully");

            navigate(`${basePath}/${visitId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to add pathology test"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Pathology Test</span>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`${basePath}/${visitId}`)}
                >
                    <ArrowLeft className="me-2" />
                    Back
                </button>
            </div>

            <VisitPathologyTestForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEdit={false}
            />
        </>
    );
}

export default AddVisitPathologyTest;
