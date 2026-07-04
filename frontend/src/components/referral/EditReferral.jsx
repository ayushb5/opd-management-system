import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getReferral, updateReferral } from "../../services/referralService";
import ReferralForm from "./ReferralForm";

function EditReferral() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        visitId: "",
        patientId: "",
        doctorId: "",
        referralCenterId: "",
        noteType: "",
        reason: "",
        details: "",
    });

    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
    const role = user?.role;

    useEffect(() => {
        fetchReferral();
    }, []);

    const fetchReferral = async () => {
        try {
            const referral = await getReferral(id);
            setInitialValues({
                visitId: referral.visit?.id || "",
                patientId: referral.patient?.id || "",
                doctorId: referral.doctor?.id || "",
                referralCenterId: referral.referralCenter?.id || "",
                noteType: referral.noteType || "",
                reason: referral.reason || "",
                details: referral.details || "",
            })
        } catch (error) {
            toast.error("Failed to load referral");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateReferral(id, values);
            toast.success("Referral updated successfully");
            navigate(`/admin/visits/${initialValues.visitId}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update referral");
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
            navigate(`/admin/visits/${initialValues.visitId}`);
        } else if (role == "DOCTOR") {
            navigate(`/doctor/visits/${initialValues.visitId}`)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Edit Referral</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleGoBack}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <ReferralForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditReferral