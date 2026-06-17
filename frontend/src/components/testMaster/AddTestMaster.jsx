import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-bootstrap-icons';
import TestMasterForm from './TestMasterForm';
import { addTestMaster } from '../../services/testMasterService';

function AddTestMaster() {
    const navigate = useNavigate();
    const initialValues = {
        doctorId: "",
        testName: "",
        normalRange: "",
        unit: "",
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addTestMaster(values);
            toast.success("Test Master added successfully");
            navigate("/admin/test-masters/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add Test Master"
            );
            console.error(error);
            console.log(error.response.data);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Test Master</span>
                <button type="button" className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/test-masters")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <TestMasterForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddTestMaster