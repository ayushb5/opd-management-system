import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import PathologyTestForm from "./PathologyTestForm";
import { addPathologyTest } from "../../services/pathologyTestService";

function AddPathologyTest() {
    const navigate = useNavigate();
    const initialValues = {
        visitId: "",
        testMasterId: "",
        result: "",
        remarks: "",
        reportFile: ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addPathologyTest(values);
            toast.success("Pathology Test added successfully");
            navigate("/admin/pathology-tests/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add pathology test"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Pathology Test</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/pathology-tests")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <PathologyTestForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddPathologyTest;