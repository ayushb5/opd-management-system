import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { addBill } from "../../services/billService";
import BillForm from "./BillForm";

function AddBill() {
    const navigate = useNavigate();
    const { visitId } = useParams();

    const initialValues = {
        visitId: visitId || "",
        consultationFee: "",
        totalAmount: "",
        concession: "",
        paidAmount: "",
        paymentMode: "",
        paymentStatus: ""
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addBill(values);
            if (visitId) {
                toast.success("Bill generated successfully");
                navigate(`/admin/visits/${visitId}`);
            } else {
                toast.success("Bill added successfully");
                navigate("/admin/bills/")
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add bill"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    const handleGoBack = () => {
        if (visitId) {
            navigate(`/admin/visits/${visitId}`);
        } else {
            navigate("/admin/bills");
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Bill</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleGoBack}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <BillForm initialValues={initialValues} onSubmit={handleSubmit} fixedVisit={Boolean(visitId)} />
        </>
    )
}

export default AddBill;