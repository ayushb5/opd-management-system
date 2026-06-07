import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addReceptionist } from "../../../services/receptionistService";
import ReceptionistForm from "../../../components/receptionist/ReceptionistForm";

function AddReceptionist() {
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        mobileno: "",
        doctorId: ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addReceptionist(values);
            toast.success("Receptionist added successfully");
            navigate("/admin/receptionists/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add receptionist"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Receptionist</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/receptionists")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <ReceptionistForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddReceptionist;