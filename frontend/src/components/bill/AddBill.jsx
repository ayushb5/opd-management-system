import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { addBill } from "../../services/billService";
import BillForm from "./BillForm";

function AddBill() {
    const navigate = useNavigate();
    const { visitId } = useParams();
    const hasVisitId = Boolean(visitId && visitId !== "undefined");

    const initialValues = {
        visitId: hasVisitId ? visitId : "",
        consultationFee: "",
        totalAmount: "",
        concession: "",
        paidAmount: "",
        paymentMode: "",
        paymentStatus: ""
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    const basePath = role === "RECEPTIONIST" ? "/receptionist" : "/admin";

    const getBackPath = () => {
        if (hasVisitId) {
            return `${basePath}/visits/${visitId}`;
        }

        return `${basePath}/bills`;
    };

    const handleGoBack = () => {
        navigate(getBackPath());
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addBill(values);
            if (hasVisitId) {
                toast.success("Bill generated successfully");
            } else {
                toast.success("Bill added successfully");
            }

            navigate(getBackPath());
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
                    onClick={handleGoBack}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <BillForm initialValues={initialValues} onSubmit={handleSubmit} fixedVisit={hasVisitId} />
        </>
    )
}

export default AddBill;
