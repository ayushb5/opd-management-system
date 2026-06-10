import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addPatient } from "../../../services/patientService";
import PatientForm from "../../../components/patient/PatientForm";

function AddPatient() {
    const navigate = useNavigate();
    const initialValues = {
        doctorId: "",
        patientName: "",
        age: "",
        gender: "",
        mobileNo: "",
        address: "",
        bloodGroup: "",
        height: "",
        smoking: "",
        alcohol: "",
        tobacco: ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addPatient(values);
            toast.success("Patient added successfully");
            navigate("/admin/patients/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add patient"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Patient</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/patients")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <PatientForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddPatient;