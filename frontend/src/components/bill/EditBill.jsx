import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getBill, updateBill } from "../../services/billService";
import BillForm from "./BillForm";

function EditBill() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        visitId: "",
        consultationFee: "",
        totalAmount: "",
        concession: "",
        paidAmount: "",
        paymentMode: "",
        paymentStatus: ""
    });

    useEffect(() => {
        fetchBill();
    }, []);

    const fetchBill = async () => {
        try {
            const bill = await getBill(id);
            setInitialValues({
                visitId: bill.visit.id || "",
                consultationFee: bill.consultationFee || "",
                totalAmount: bill.totalAmount || "",
                concession: bill.concession || "",
                paidAmount: bill.paidAmount || "",
                paymentMode: bill.paymentMode || "",
                paymentStatus: bill.paymentStatus || ""
            })
        } catch (error) {
            toast.error("Failed to load bill");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateBill(id, values);
            toast.success("Bill updated successfully");
            navigate("/admin/bills/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update bill");
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
                <span className="fs-2 fw-semibold">Edit Bill</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/bills")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <BillForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditBill