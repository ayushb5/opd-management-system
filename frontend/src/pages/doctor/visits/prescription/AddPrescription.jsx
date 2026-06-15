import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import DoctorForm from "../../../../components/doctor/DoctorForm";
import { toast } from "react-toastify";
import { addDoctor } from "../../../../services/doctorService";

function AddPrescription() {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        specialization: "",
        clinicName: "",
        address: "",
        mobileNo: "",
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addDoctor(values);
            toast.success("Doctor added successfully");
            navigate("/admin/doctors/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add doctor"
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
                <span className="fs-2 fw-semibold">Add Prescription</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/doctor/visits/${user.id}`)}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <DoctorForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddPrescription