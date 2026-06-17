import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getDoctorById, updateDoctor } from "../../services/doctorService";
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import DoctorForm from "./DoctorForm";
function EditDoctor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        specialization: "",
        clinicName: "",
        address: "",
        mobileNo: "",
        status: "TRIAL"
    });

    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor = async () => {
        try {
            const doctor = await getDoctorById(id);
            setInitialValues({
                name: doctor.name || "",
                email: doctor.email || "",
                specialization: doctor.specialization || "",
                clinicName: doctor.clinicName || "",
                mobileNo: doctor.mobileNo || "",
                status: doctor.status || "TRIAL",
                address: doctor.address || ""
            })
        } catch (error) {
            toast.error("Failed to load doctor");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateDoctor(id, values);
            toast.success("Doctor updated successfully");
            navigate("/admin/doctors/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update doctor");
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
                <span className="fs-2 fw-semibold">Edit Doctor</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/doctors")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <DoctorForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditDoctor