import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-bootstrap-icons';
import { addReferral } from "../../services/referralService"
import ReferralForm from "./ReferralForm"

function AddReferral() {
    const navigate = useNavigate();
    const location = useLocation();

    const referralData = location.state;

    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
    const role = user?.role;

    const initialValues = {
        visitId: referralData?.visitId || "",
        patientId: referralData?.patientId || "",
        doctorId: referralData?.doctorId || "",

        referralCenterId: "",
        noteType: "",
        reason: "",
        details: "",
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addReferral({
                ...values,
                visitId: Number(values.visitId),
                patientId: Number(values.patientId),
                doctorId: Number(values.doctorId),
                referralCenterId: Number(values.referralCenterId),
            });
            toast.success("Referral added successfully");
            navigate(`/admin/visits/${values.visitId}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add referral"
            );
            console.error(error);
            console.log(error.response.data);
        } finally {
            setSubmitting(false);
        }
    }

    const handleGoBack = () => {
        if (role == "ADMIN") {
            navigate(`/admin/visits/${initialValues.visitId}`);
        } else if (role == "DOCTOR") {
            navigate(`/doctor/visits/${initialValues.visitId}`)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Referral</span>
                <button type="button" className="btn btn-outline-secondary"
                    onClick={handleGoBack}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <ReferralForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddReferral