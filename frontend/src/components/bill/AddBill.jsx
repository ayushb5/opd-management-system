import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addBill } from "../../services/billService";
import BillForm from "./BillForm";

function AddBill() {
    const navigate = useNavigate();
    const initialValues = {
        visitId: "",
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
            toast.success("Bill added successfully");
            navigate("/admin/bills/")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add bill"
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Add Bill</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/bills")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <BillForm initialValues={initialValues} onSubmit={handleSubmit} />
        </>
    )
}

export default AddBill;