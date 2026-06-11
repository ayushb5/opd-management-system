import { useNavigate } from 'react-router-dom';
import { addReferralCenter } from '../../../services/referralCenterService';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-bootstrap-icons';
import ReferralCenterForm from '../../../components/referralCenter/ReferralCenterForm';

function AddReferralCenter() {
    const navigate = useNavigate();
    const initialValues = {
        doctorId: "",
        name: "",
        type: "",
        contactInfo: "",
        address: ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addReferralCenter(values);
            toast.success("Referral Center added successfully");
            navigate("/admin/referral-centers/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add referral centers"
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
                <span className="fs-2 fw-semibold">Add Referral Center</span>
                <button type="button" className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/referral-centers")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <ReferralCenterForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddReferralCenter