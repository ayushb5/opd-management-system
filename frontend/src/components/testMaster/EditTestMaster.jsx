import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getTestMaster, updateTestMaster } from "../../services/testMasterService"
import TestMasterForm from "./TestMasterForm";
function EditTestMaster() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        doctorId: "",
        testName: "",
        normalRange: "",
        unit: "",
    });

    useEffect(() => {
        fetchTestMaster();
    }, []);

    const fetchTestMaster = async () => {
        try {
            const testMaster = await getTestMaster(id);
            setInitialValues({
                doctorId: testMaster.doctor.id || "",
                testName: testMaster.testName || "",
                normalRange: testMaster.normalRange || "",
                unit: testMaster.unit || ""
            })
        } catch (error) {
            toast.error("Failed to load Test Master");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateTestMaster(id, values);
            toast.success("Test Master updated successfully");
            navigate("/admin/test-masters/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update Test Master");
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
                <span className="fs-2 fw-semibold">Edit Test Master</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/test-masters")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <TestMasterForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditTestMaster