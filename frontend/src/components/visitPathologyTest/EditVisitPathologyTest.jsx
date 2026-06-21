import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getPathologyTest, updatePathologyTest } from "../../services/pathologyTestService";
import VisitPathologyTestForm from "./VisitPathologyTestForm";

function EditVisitPathologyTest() {
    const { visitId, testId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.startsWith("/doctor/visits")
        ? "/doctor/visits"
        : "/admin/visits";
    const [pathologyTest, setPathologyTest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPathologyTest = async () => {
            try {
                const data = await getPathologyTest(testId);
                setPathologyTest(data);
            } catch (error) {
                toast.error("Failed to load pathology test details");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPathologyTest();
    }, [testId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updatePathologyTest(testId, {
                visitId: Number(visitId),
                testMasterId: Number(values.testMasterId),
                result: values.result,
                remarks: values.remarks,
                reportFile: values.reportFile
            });

            toast.success("Pathology test updated successfully");

            navigate(`${basePath}/${visitId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update pathology test"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pathologyTest) {
        return <div>Pathology test not found</div>;
    }

    const initialValues = {
        testMasterId: pathologyTest.testMaster?.id || "",
        result: pathologyTest.result || "",
        remarks: pathologyTest.remarks || "",
        reportFile: pathologyTest.reportFile || ""
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Edit Pathology Test</span>

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
                isEdit={true}
            />
        </>
    );
}

export default EditVisitPathologyTest;
