import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getReceptionist, updateReceptionist } from "../../services/receptionistService";
import ReceptionistForm from "./ReceptionistForm";

function EditReceptionist() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        mobileNo: "",
        status: "ACTIVE",
        doctorId: ""
    });

    useEffect(() => {
        fetchReceptionist();
    }, []);

    const fetchReceptionist = async () => {
        try {
            const receptionist = await getReceptionist(id);
            setInitialValues({
                name: receptionist.name || "",
                email: receptionist.email || "",
                mobileNo: receptionist.mobileNo || "",
                status: receptionist.status || "ACTIVE",
                doctorId: receptionist.doctor?.id || ""
            })
        } catch (error) {
            toast.error("Failed to load receptionist");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateReceptionist(id, values);
            toast.success("Receptionist updated successfully");
            navigate("/admin/receptionists/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update receptionist");
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
                <span className="fs-2 fw-semibold">Edit Receptionist</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/receptionists")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <ReceptionistForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditReceptionist