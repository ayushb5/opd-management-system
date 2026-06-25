import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getPatientById, updatePatient } from "../../services/patientService";
import PatientForm from "./PatientForm";

function EditPatient() {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
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
    });

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const patient = await getPatientById(id);
            setInitialValues({
                doctorId: patient.doctor?.id || "",
                patientName: patient.patientName || "",
                age: patient.age || "",
                gender: patient.gender || "",
                mobileNo: patient.mobileNo || "",
                address: patient.address || "",
                bloodGroup: patient.bloodGroup || "",
                height: patient.height || "",
                smoking: patient.smoking || "",
                alcohol: patient.alcohol || "",
                tobacco: patient.tobacco || ""
            })
        } catch (error) {
            toast.error("Failed to load patient");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updatePatient(id, values);
            toast.success("Patient updated successfully");
            navigate("/admin/patients/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update patient");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleGoBack = () => {
        if (role == "ADMIN") {
            navigate("/admin/patients");
        } else if (role == "RECEPTIONIST") {
            navigate("/receptionist/patients");
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Edit Patient</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleGoBack}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <PatientForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditPatient