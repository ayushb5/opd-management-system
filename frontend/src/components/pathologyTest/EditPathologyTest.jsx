import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getPathologyTest, updatePathologyTest } from "../../services/pathologyTestService";
import PathologyTestForm from "./PathologyTestForm";

function EditPathologyTest() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        visitId: "",
        testMasterId: "",
        result: "",
        remarks: "",
        reportFile: ""
    });

    useEffect(() => {
        fetchPathologyTest();
    }, []);

    const fetchPathologyTest = async () => {
        try {
            const pathologyTest = await getPathologyTest(id);
            setInitialValues({
                visitId: pathologyTest.visit?.id || "",
                testMasterId: pathologyTest.testMaster?.id || "",
                result: pathologyTest.result || "",
                remarks: pathologyTest.remarks || "",
                reportFile: pathologyTest.reportFile || ""
            })
        } catch (error) {
            toast.error("Failed to load pathology test");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updatePathologyTest(id, values);
            toast.success("Pathology Test updated successfully");
            navigate("/admin/pathology-tests/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update pathology test");
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
                <span className="fs-2 fw-semibold">Edit Pathology Test</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/pathology-tests")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <PathologyTestForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditPathologyTest