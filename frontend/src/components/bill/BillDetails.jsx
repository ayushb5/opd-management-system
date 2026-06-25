import { ArrowLeft, Printer } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBill } from "../../services/billService";

function BillDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;

    useEffect(() => {
        fetchBill();
    }, [id]);

    const fetchBill = async () => {
        try {
            setLoading(true);
            const data = await getBill(id);
            setBill(data);
        } catch (error) {
            console.error("Failed to fetch bill:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (amount) => {
        return Number(amount || 0).toFixed(2);
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return "-";

        return new Date(dateTime).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    const getStatusClass = (status) => {
        if (status === "PAID") return "bg-success";
        if (status === "PARTIAL") return "bg-warning text-dark";
        return "bg-danger";
    };

    if (loading) {
        return <div className="text-center mt-5">Loading bill...</div>;
    }

    if (!bill) {
        return (
            <div className="alert alert-danger mt-4">
                Bill not found.
            </div>
        );
    }

    const patient = bill.visit?.patient;
    const doctor = bill.visit?.doctor;



    const handlePrintPdf = () => {
        window.open(
            `http://localhost:8080/bills/${bill.id}/pdf`,
            "_blank"
        );
    };

    const goToVisitList = () => {
        if (role == "ADMIN") {
            navigate(`/admin/visits/${bill.visit.id}`);
        } else if (role == "DOCTOR") {
            navigate(`/doctor/visits/${bill.visit.id}`);
        } else if (role == "RECEPTIONIST") {
            navigate(`/receptionist/visits/${bill.visit.id}`);
        }
    }


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 no-print">
                <span className="fs-2 fw-semibold">Bill Details</span>

                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={goToVisitList}
                        title="Go Back"
                        aria-label="Go Back"
                    >
                        <ArrowLeft className="me-md-2" />
                        <span className="d-none d-md-inline">Go Back</span>
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handlePrintPdf}
                        title="Print PDF"
                        aria-label="Print PDF"
                    >
                        <Printer className="me-md-2" />
                        <span className="d-none d-md-inline">Print PDF</span>
                    </button>
                </div>
            </div>

            <div className="card shadow-sm border-0 bill-print-card">
                <div className="card-body p-4 p-md-5">

                    <div className="text-center border-bottom pb-4 mb-4">
                        <h2 className="fw-bold mb-1">City Care Hospital</h2>
                        <p className="mb-1 text-muted">OPD Management Portal</p>
                        <p className="mb-0 text-muted">
                            Patient Consultation Receipt
                        </p>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <p className="mb-1">
                                <strong>Bill ID:</strong> #{bill.id}
                            </p>
                            <p className="mb-1">
                                <strong>Visit ID:</strong> #{bill.visit?.id}
                            </p>
                            <p className="mb-0">
                                <strong>Bill Date:</strong> {formatDateTime(bill.createdAt)}
                            </p>
                        </div>

                        <div className="col-md-6 text-md-end mt-3 mt-md-0">
                            <span className={`badge fs - 6 px - 3 py - 2 ${getStatusClass(bill.paymentStatus)} `}>
                                {bill.paymentStatus}
                            </span>
                        </div>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            <div className="border rounded p-3 h-100">
                                <h5 className="fw-semibold border-bottom pb-2">
                                    Patient Details
                                </h5>

                                <p className="mb-2">
                                    <strong>Name:</strong> {patient?.patientName || "-"}
                                </p>

                                <p className="mb-2">
                                    <strong>Mobile:</strong> {patient?.mobileNo || "-"}
                                </p>

                                <p className="mb-2">
                                    <strong>Age:</strong> {patient?.age || "-"}
                                </p>

                                <p className="mb-0">
                                    <strong>Gender:</strong> {patient?.gender || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded p-3 h-100">
                                <h5 className="fw-semibold border-bottom pb-2">
                                    Visit Details
                                </h5>

                                <p className="mb-2">
                                    <strong>Doctor:</strong> {doctor?.name || "-"}
                                </p>

                                <p className="mb-2">
                                    <strong>Specialization:</strong> {doctor?.specialization || "-"}
                                </p>

                                <p className="mb-2">
                                    <strong>Visit Date:</strong> {bill.visit?.visitDate || "-"}
                                </p>

                                <p className="mb-0">
                                    <strong>Payment Mode:</strong> {bill.paymentMode || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Particular</th>
                                    <th className="text-end">Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Consultation Fee</td>
                                    <td className="text-end">
                                        ₹ {formatAmount(bill.consultationFee)}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Concession</td>
                                    <td className="text-end text-danger">
                                        - ₹ {formatAmount(bill.concession)}
                                    </td>
                                </tr>

                                <tr className="fw-bold">
                                    <td>Total Amount</td>
                                    <td className="text-end">
                                        ₹ {formatAmount(bill.totalAmount)}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Paid Amount</td>
                                    <td className="text-end text-success">
                                        ₹ {formatAmount(bill.paidAmount)}
                                    </td>
                                </tr>

                                <tr className="fw-bold">
                                    <td>Pending Amount</td>
                                    <td className="text-end text-danger">
                                        ₹ {formatAmount(bill.pendingAmount)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border-top mt-4 pt-3">
                        <p className="mb-1">
                            <strong>Payment Status:</strong> {bill.paymentStatus}
                        </p>

                        <p className="mb-0 text-muted">
                            This is a computer-generated bill and does not require a signature.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default BillDetails;
