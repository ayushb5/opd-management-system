import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { getAllVisits } from "../../services/visitService"
import { billValidationSchema } from "../../validations/billValidation"

function BillForm({ initialValues, onSubmit, isEdit = false, fixedVisit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: billValidationSchema,
        onSubmit,
        enableReinitialize: true
    })

    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        try {
            const data = await getAllVisits();
            setVisits(data);
        } catch (error) {
            console.error(error);
        }
    }

    const pendingAmount = Math.max(
        0,
        Number(formik.values.totalAmount || 0)
        - Number(formik.values.concession || 0)
        - Number(formik.values.paidAmount || 0)
    );

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                {!fixedVisit ? (
                    <div className="col-lg-6">
                        <label htmlFor="visitId" className="form-label">
                            Select Visit <span className="text-danger">*</span>
                        </label>
                        <select name="visitId" id="visitId" value={formik.values.visitId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select">
                            <option value="">Select Visit</option>
                            {visits.map((visit) => (
                                <option key={visit.id} value={visit.id}>
                                    {visit.patient?.patientName} | {visit.visitDate} | {visit.doctor?.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.visitId && formik.errors.visitId && (
                            <div className="text-danger">{formik.errors.visitId}</div>
                        )}
                    </div>
                ) : (<div className="col-lg-6">
                    <label className="form-label">Visit ID</label>

                    <input
                        type="text"
                        value={`Visit #${formik.values.visitId}`}
                        className="form-control"
                        disabled
                    />
                </div>)}
                <div className="col-lg-6">
                    <label htmlFor="consultationFee" className="form-label">
                        Consultation fee <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        id="consultationFee"
                        name="consultationFee"
                        value={formik.values.consultationFee}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                    />
                    {formik.touched.consultationFee && formik.errors.consultationFee && (
                        <div className="text-danger">{formik.errors.consultationFee}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="totalAmount" className="form-label">
                        Total Amount <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        id="totalAmount"
                        name="totalAmount"
                        value={formik.values.totalAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                    />
                    {formik.touched.totalAmount && formik.errors.totalAmount && (
                        <div className="text-danger">{formik.errors.totalAmount}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="concession" className="form-label">
                        Concession <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        id="concession"
                        name="concession"
                        value={formik.values.concession}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                    />
                    {formik.touched.concession && formik.errors.concession && (
                        <div className="text-danger">{formik.errors.concession}</div>
                    )}
                </div>
            </div>
            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="paidAmount" className="form-label">
                        Paid Amount <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        id="paidAmount"
                        name="paidAmount"
                        value={formik.values.paidAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                    />                    {formik.touched.paidAmount && formik.errors.paidAmount && (
                        <div className="text-danger">{formik.errors.paidAmount}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="pendingAmount" className="form-label">
                        Pending Amount
                    </label>
                    <input
                        type="text"
                        className="form-control border-black"
                        value={`₹ ${pendingAmount}`}
                        disabled
                    />
                </div>
            </div>
            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="paymentMode" className="form-label">
                        Payment Mode <span className="text-danger">*</span>
                    </label>
                    <select
                        name="paymentMode"
                        className="form-select border-black"
                        value={formik.values.paymentMode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="CASH">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="CARD">Card</option>
                    </select>
                    {formik.touched.paymentMode && formik.errors.paymentMode && (
                        <div className="text-danger">{formik.errors.paymentMode}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="paymentStatus" className="form-label">
                        Payment Status <span className="text-danger">*</span>
                    </label>
                    <select
                        name="paymentStatus"
                        className="form-select border-black"
                        value={formik.values.paymentStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select Payment Status</option>
                        <option value="PAID">Paid</option>
                        <option value="PARTIAL">Partial</option>
                        <option value="PENDING">Pending</option>
                    </select>
                    {formik.touched.paymentStatus && formik.errors.paymentStatus && (
                        <div className="text-danger">{formik.errors.paymentStatus}</div>
                    )}
                </div>
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Bill" : "Add Bill"}
                </button>
            </div>
        </form>
    )
}

export default BillForm