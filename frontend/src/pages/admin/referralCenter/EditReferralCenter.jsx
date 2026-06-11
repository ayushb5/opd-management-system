import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getReferralCenter, updateReferralCenter } from "../../../services/referralCenterService";
import ReferralCenterForm from "../../../components/referralCenter/ReferralCenterForm";
function EditReferralCenter() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        doctorId: "",
        name: "",
        type: "",
        contactInfo: "",
        address: ""
    });

    useEffect(() => {
        fetchReferralCenter();
    }, []);

    const fetchReferralCenter = async () => {
        try {
            const rc = await getReferralCenter(id);
            setInitialValues({
                doctorId: rc.doctor.id || "",
                name: rc.name || "",
                type: rc.type || "",
                contactInfo: rc.contactInfo || "",
                address: rc.address || ""
            })
        } catch (error) {
            toast.error("Failed to load referral center");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateReferralCenter(id, values);
            toast.success("Referral Center updated successfully");
            navigate("/admin/referral-centers/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update referral center");
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
                <span className="fs-2 fw-semibold">Edit Referral Center</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/referral-centers")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <ReferralCenterForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditReferralCenter