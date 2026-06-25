import { useNavigate } from 'react-router-dom';
import { addReferralCenter } from '../../services/referralCenterService';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-bootstrap-icons';
import ReferralCenterForm from './ReferralCenterForm';

function AddReferralCenter() {
    const navigate = useNavigate();
    const initialValues = {
        doctorId: "",
        name: "",
        type: "",
        contactInfo: "",
        address: ""
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;

    const handleNavigation = () => {
        if (role == "ADMIN") {
            navigate("/admin/referral-centers")
        } else if (role == "RECEPTIONIST") {
            navigate("/receptionist/referral-centers")
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addReferralCenter(values);
            toast.success("Referral Center added successfully");
            handleNavigation();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add referral centers"
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Referral Center</span>
                <button type="button" className="btn btn-outline-secondary"
                    onClick={handleNavigation}
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